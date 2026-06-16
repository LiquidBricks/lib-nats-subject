import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')

const eventsRoot = fileURLToPath(new URL('./', import.meta.url))
const subjectKeys = ['env', 'ns', 'tenant', 'context', 'channel', 'entity', 'action', 'version', 'id']
const diagnosticsRoots = new Set(['tele', 'metrics'])

function normalizePathToken(key, token) {
  if (key === 'ns' && token === 'component_service') return 'component-service'
  return token
}

export function subjectPatchFromPathTokens(tokens) {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    throw new Error('Subject patch path must contain at least one token')
  }

  if (diagnosticsRoots.has(tokens[0])) {
    if (tokens.length !== 2) {
      throw new Error('Diagnostics subject patch paths must be <root>/<tail>')
    }

    return Object.freeze({
      root: tokens[0],
      tail: tokens[1],
    })
  }

  if (tokens.length > subjectKeys.length) {
    throw new Error('NATS subject patch path has too many tokens')
  }

  return Object.freeze(Object.fromEntries(tokens.map((token, index) => {
    const key = subjectKeys[index]
    return [key, normalizePathToken(key, token)]
  })))
}

export function subjectPatchFromUrl(url) {
  const filePath = fileURLToPath(url)
  const relative = path.relative(eventsRoot, path.dirname(filePath)).split(path.sep)
  return subjectPatchFromPathTokens(relative)
}

export function createSubjectPatchFromUrl(url) {
  return Object.freeze({
    [SUBJECT_PATCH]: subjectPatchFromUrl(url),
  })
}
