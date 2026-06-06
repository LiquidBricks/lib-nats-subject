import test from 'node:test'
import assert from 'node:assert/strict'

import { create } from '../../../subjectFactory/create/diagnostics.js'

test('builds diagnostics filter subjects from static patches', () => {
  assert.equal(create({ root: 'tele', tail: '>' }).forSubscribe().build(), 'tele.>')
  assert.equal(create({ root: 'metrics', tail: '>' }).forSubscribe().build(), 'metrics.>')
})

test('accepts diagnostics filter string initialization', () => {
  assert.equal(create('tele.>').build(), 'tele.>')
})

test('rejects invalid diagnostics roots and tails', () => {
  assert.throws(() => create({ root: 'other', tail: '>' }), (err) => err && err.code === 'SUBJECT_TOKEN_UNKNOWN')
  assert.throws(() => create({ root: 'tele', tail: '*' }), (err) => err && err.code === 'SUBJECT_TOKEN_UNKNOWN')
})
