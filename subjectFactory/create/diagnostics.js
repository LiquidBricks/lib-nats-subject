// Diagnostics stream filter subject builder.
// Shapes currently used by runtime consumers:
// - tele.>
// - metrics.>
import { SUBJECT_TOKEN_OVERRIDE, SUBJECT_TOKEN_UNKNOWN } from '../../codes.js'

const ROOTS = ['tele', 'metrics']
const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')
const subjectPatch = (patch) => {
  if (patch && typeof patch === 'object' && patch[SUBJECT_PATCH]) return patch[SUBJECT_PATCH]
  return patch
}

export function create(init = {}) {
  const state = Object.create(null)

  let initial = init
  if (typeof init === 'string') {
    const parts = init.split('.')
    initial = { root: parts[0], tail: parts[1] }
  } else if (initial == null || typeof initial !== 'object') {
    initial = {}
  } else {
    initial = subjectPatch(initial)
  }

  if (initial.root !== undefined) ensureRoot(initial.root)
  if (initial.tail !== undefined) ensureTail(initial.tail)

  function ensureNotOverride(key, value) {
    const cur = state[key]
    const has = cur !== undefined
    if (has && cur !== value) {
      const err = new Error(`Subject token already set: ${key}`)
      err.code = SUBJECT_TOKEN_OVERRIDE
      err.meta = { key, current: cur, attempted: value }
      throw err
    }
    if (!has) state[key] = value
  }

  function ensureRoot(v) {
    if (!ROOTS.includes(v)) {
      const err = new Error(`Invalid diagnostics root: ${v}`)
      err.code = SUBJECT_TOKEN_UNKNOWN
      err.meta = { root: v, allowed: ROOTS.slice() }
      throw err
    }
    ensureNotOverride('root', v)
  }

  function ensureTail(v) {
    if (v !== '>') {
      const err = new Error(`Invalid diagnostics filter tail: ${v}`)
      err.code = SUBJECT_TOKEN_UNKNOWN
      err.meta = { tail: v, allowed: ['>'] }
      throw err
    }
    ensureNotOverride('tail', v)
  }

  const parts = () => {
    if (!state.root) {
      const err = new Error('Diagnostics root is required')
      err.code = SUBJECT_TOKEN_UNKNOWN
      throw err
    }
    if (!state.tail) {
      const err = new Error('Diagnostics filter tail is required')
      err.code = SUBJECT_TOKEN_UNKNOWN
      throw err
    }
    return [state.root, state.tail]
  }
  const build = () => parts().join('.')

  const api = {
    root(v) { ensureRoot(v); return api },
    tail(v) { ensureTail(v); return api },
    forSubscribe() { return api },
    forPublish() { return api },
    build,
    toString: build,
    parts,
    get value() { return { ...state } },
  }

  return api
}
