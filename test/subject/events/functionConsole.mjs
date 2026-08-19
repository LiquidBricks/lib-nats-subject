import test from 'node:test'
import assert from 'node:assert/strict'

import { create as createBasicSubject } from '../../../subjectFactory/create/basic.js'
import { SUBJECT_PATCH } from '../../../events/nats/_subjectPatch.js'
import { events as natsEvents } from '../../../events/nats/index.js'
import {
  events as hierarchicalEvents,
  meta as hierarchicalMeta,
} from '../../../events/nats/*/index.js'

const expectedProperties = {
  instanceId: { type: 'string', minLength: 1 },
  name: { type: 'string', minLength: 1 },
  type: { type: 'string', enum: ['data', 'gate', 'task'] },
  method: { type: 'string', minLength: 1 },
  args: { type: 'array', items: {} },
}

const expectedFactProperties = {
  ...expectedProperties,
  logId: { type: 'string', minLength: 1 },
  updatedAt: {
    type: 'string',
    format: 'date-time',
    pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$',
  },
}

test('function_console ingress and has_log fact carry method and invocation identity', () => {
  const gatewayTokens = natsEvents['*'].gateway['*'].function_console.evt.console['*'].v1['*']
  const factTokens = natsEvents['*'].domain['*']['*'].edge.has_log['*'].v1['*']

  assert.equal(
    createBasicSubject(gatewayTokens).forPublish()
      .env('prod')
      .action('warn')
      .id('instance-1')
      .build(),
    'prod.gateway._.function_console.evt.console.warn.v1.instance-1',
  )
  assert.equal(
    createBasicSubject(factTokens).forPublish()
      .env('prod')
      .action('warn')
      .id('instance-1')
      .build(),
    'prod.domain._._.edge.has_log.warn.v1.instance-1',
  )

  assert.deepEqual(gatewayTokens[SUBJECT_PATCH], {
    env: '*',
    ns: 'gateway',
    tenant: '*',
    context: 'function_console',
    channel: 'evt',
    entity: 'console',
    action: '*',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(factTokens[SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'edge',
    entity: 'has_log',
    action: '*',
    version: 'v1',
    id: '*',
  })
})

test('hierarchical exports include gateway console and domain has_log schemas', () => {
  assert.deepEqual(
    hierarchicalEvents.gateway['*'].function_console.evt.console['*'].v1['*'][SUBJECT_PATCH],
    natsEvents['*'].gateway['*'].function_console.evt.console['*'].v1['*'][SUBJECT_PATCH],
  )
  assert.deepEqual(
    hierarchicalEvents.domain['*']['*'].edge.has_log['*'].v1['*'][SUBJECT_PATCH],
    natsEvents['*'].domain['*']['*'].edge.has_log['*'].v1['*'][SUBJECT_PATCH],
  )

  const gatewaySchema = hierarchicalMeta.gateway['*'].function_console.evt.console['*'].v1['*'].schema
  assert.deepEqual(gatewaySchema.required, ['instanceId', 'name', 'type', 'method', 'args'])
  assert.deepEqual(gatewaySchema.properties, expectedProperties)

  const factSchema = hierarchicalMeta.domain['*']['*'].edge.has_log['*'].v1['*'].schema
  assert.deepEqual(factSchema.required, ['data'])
  assert.deepEqual(
    factSchema.properties.data.required,
    ['instanceId', 'logId', 'name', 'type', 'method', 'args', 'updatedAt'],
  )
  assert.deepEqual(factSchema.properties.data.properties, expectedFactProperties)
})

test('log snapshots retain method context in a distinct snapshot entity', () => {
  const snapshotTokens = natsEvents['*'].domain['*']['*'].snapshot.log['*'].v1['*']
  const subject = createBasicSubject(snapshotTokens).forPublish()
    .env('prod')
    .context('delta')
    .action('error')
    .id('instance-1')
    .build()

  assert.equal(subject, 'prod.domain._.delta.snapshot.log.error.v1.instance-1')
  assert.deepEqual(snapshotTokens[SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'snapshot',
    entity: 'log',
    action: '*',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(
    hierarchicalEvents.domain['*']['*'].snapshot.log['*'].v1['*'][SUBJECT_PATCH],
    snapshotTokens[SUBJECT_PATCH],
  )

  const schema = hierarchicalMeta.domain['*']['*'].snapshot.log['*'].v1['*'].schema
  assert.deepEqual(schema.required, ['data'])
  assert.deepEqual(schema.properties.data.required, [
    'instanceId',
    'instanceVertexId',
    'componentStateId',
    'logId',
    'name',
    'type',
    'method',
    'args',
    'delta',
    'updatedAt',
  ])
  assert.deepEqual(schema.properties.data.properties.delta.required, ['logs'])
})
