// Subject builder: fluent API for 9-part subjects
// Shape: <env>.<ns>.<tenant>.<context>.<channel>.<entity>.<action>.<version>.<id>
import { SUBJECT_TOKEN_COUNT, SUBJECT_TOKEN_OVERRIDE, SUBJECT_TOKEN_UNKNOWN } from '../../codes.js'

const isMissing = (v) => v === undefined || v === null || v === ''
const norm = (v) => (isMissing(v) ? '_' : String(v))
const isWildcard = (v) => v === '*'
const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')
const subjectPatch = (patch) => {
  if (patch && typeof patch === 'object' && patch[SUBJECT_PATCH]) return patch[SUBJECT_PATCH]
  return patch
}

export function create(init = {}) {
  const KEYS = ['env', 'ns', 'tenant', 'context', 'channel', 'entity', 'action', 'version', 'id']
  const state = Object.create(null)

  // Support initializing from a fully-qualified subject string
  // Shape: env.ns.tenant.context.channel.entity.action.version.id
  let initial = init
  if (typeof init === 'string') {
    const tokens = init.split('.')
    if (tokens.length !== KEYS.length) {
      const err = new Error(`Expected ${KEYS.length} tokens, got ${tokens.length}`)
      err.code = SUBJECT_TOKEN_COUNT
      err.meta = { expected: KEYS.length, received: tokens.length }
      throw err
    }
    initial = {}
    for (let i = 0; i < KEYS.length; i++) initial[KEYS[i]] = tokens[i]
  } else if (initial == null || typeof initial !== 'object') {
    initial = {}
  } else {
    initial = subjectPatch(initial)
  }

  for (const k of KEYS) {
    if (initial[k] !== undefined) state[k] = initial[k]
  }

  const ensureSet = (k, v) => {
    if (!KEYS.includes(k)) {
      const err = new Error(`Unknown subject token: ${k}`)
      err.code = SUBJECT_TOKEN_UNKNOWN
      throw err
    }
    const cur = state[k]
    const has = cur !== undefined

    if (isWildcard(v)) {
      if (!has) state[k] = v
      return
    }

    if (has && isWildcard(cur)) {
      state[k] = v
      return
    }

    if (has && cur !== v) {
      const err = new Error(`Subject token already set: ${k}`)
      err.code = SUBJECT_TOKEN_OVERRIDE
      err.meta = { key: k, current: cur, attempted: v }
      throw err
    }
    if (!has) state[k] = v
  }

  const partsFor = (mode) => KEYS.map((k) => {
    const value = norm(state[k])
    return mode === 'publish' && isWildcard(value) ? '_' : value
  })

  let forSubscribe
  let forPublish

  const createApi = (mode) => {
    const parts = () => partsFor(mode)
    const build = () => parts().join('.')
    const api = {
      // Generic multi-setter; throws if overriding with a different value
      set(patch = {}) {
        for (const [k, v] of Object.entries(subjectPatch(patch))) ensureSet(k, v)
        return api
      },
      // Individual token setters
      env(v) { ensureSet('env', v); return api },
      ns(v) { ensureSet('ns', v); return api },
      tenant(v) { ensureSet('tenant', v); return api },
      context(v) { ensureSet('context', v); return api },
      channel(v) { ensureSet('channel', v); return api },
      entity(v) { ensureSet('entity', v); return api },
      action(v) { ensureSet('action', v); return api },
      version(v) { ensureSet('version', v); return api },
      id(v) { ensureSet('id', v); return api },
      get forSubscribe() { return forSubscribe },
      get forPublish() { return forPublish },
      // Materialize
      build,
      toString: build,
      // Access normalized parts if needed
      parts,
      // For inspection/testing
      get value() { return { ...state } },
    }
    return api
  }

  forSubscribe = createApi('subscribe')
  forPublish = createApi('publish')

  return forSubscribe
}

