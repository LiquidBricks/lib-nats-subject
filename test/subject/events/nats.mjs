import test from 'node:test'
import assert from 'node:assert/strict'

import { create as createBasicSubject } from '@liquid-bricks/lib-nats-subject/create/basic'
import { events as natsEvents, constants } from '@liquid-bricks/lib-nats-subject/events/nats'

const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')

test('NATS event tokens build publish subject with wildcard placeholders as underscores', () => {
  const createDone = natsEvents['*'].component_service['*']['*'].evt.componentInstance.createDone.v1['*']

  const subject = createBasicSubject(createDone)
    .env('prod')
    .build()

  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.createDone.v1._')
  assert.deepEqual(Object.keys(createDone), [])
  assert.deepEqual(createDone[SUBJECT_PATCH], {
    env: '*',
    ns: 'component-service',
    tenant: '*',
    context: '*',
    channel: 'evt',
    entity: 'componentInstance',
    action: 'createDone',
    version: 'v1',
    id: '*',
  })
})

test('NATS event tokens can initialize create directly', () => {
  const createDone = natsEvents['*'].component_service['*']['*'].evt.componentInstance.createDone.v1['*']

  const subject = createBasicSubject(createDone)
    .env('prod')
    .build()

  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.createDone.v1._')
})

test('NATS event export includes startDone and package-level constants', () => {
  const startDone = natsEvents['*'].component_service['*']['*'].evt.componentInstance.startDone.v1['*']

  const subject = createBasicSubject(startDone)
    .env('prod')
    .id('component-instance-1')
    .build()

  assert.equal(constants.LABEL, 'lib-nats-subject.events.nats')
  assert.deepEqual(constants.SUMMARY, { subjectCount: 19 })
  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.startDone.v1.component-instance-1')
})

test('NATS event export includes command and execution subjects', () => {
  const startCommand = natsEvents['*'].component_service['*']['*'].cmd.componentInstance.start.v1['*']
  const computeExecution = natsEvents['*'].component_service['*']['*'].exec.component.compute_result.v1['*']

  assert.equal(
    createBasicSubject(startCommand).env('prod').build(),
    'prod.component-service._._.cmd.componentInstance.start.v1._',
  )
  assert.equal(
    createBasicSubject(computeExecution).env('prod').build(),
    'prod.component-service._._.exec.component.compute_result.v1._',
  )
})
