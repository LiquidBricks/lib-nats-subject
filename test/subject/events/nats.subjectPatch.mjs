import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { SUBJECT_PATCH, subjectPatchFromPathTokens } from '../../../events/nats/_subjectPatch.js'

const eventsRoot = path.resolve(import.meta.dirname, '../../../events/nats')

function collectLeafIndexes(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))
  const hasIndex = entries.some((entry) => entry.isFile() && entry.name === 'index.js')
  const hasSchema = entries.some((entry) => entry.isFile() && entry.name === 'schema.js')

  if (hasIndex && hasSchema) {
    out.push(path.join(dir, 'index.js'))
    return out
  }

  for (const entry of entries) {
    if (entry.isDirectory()) collectLeafIndexes(path.join(dir, entry.name), out)
  }

  return out
}

function pathTokensForIndex(indexFile) {
  return path.relative(eventsRoot, path.dirname(indexFile)).split(path.sep)
}

test('NATS event subject patches are deterministic from their leaf directory paths', async () => {
  const leafIndexes = collectLeafIndexes(eventsRoot)
  assert.ok(leafIndexes.length > 0)

  for (const indexFile of leafIndexes) {
    const tokens = pathTokensForIndex(indexFile)
    const expected = subjectPatchFromPathTokens(tokens)
    const module = await import(pathToFileURL(indexFile).href)

    assert.deepEqual(
      module.events?.[SUBJECT_PATCH],
      expected,
      path.relative(eventsRoot, indexFile),
    )
  }
})
