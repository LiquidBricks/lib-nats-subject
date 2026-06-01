import test from 'node:test'
import assert from 'node:assert/strict'

import { create as createBasicSubject } from '@liquid-bricks/lib-nats-subject/create/basic'
import { events as natsEvents, constants } from '@liquid-bricks/lib-nats-subject/events/nats'

const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')

test('NATS event tokens build publish subject with wildcard placeholders as underscores', () => {
  const createDone = natsEvents['*'].component_service['*']['*'].evt.componentInstance.createDone.v1['*']

  const subject = createBasicSubject()
    .set(createDone)
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

  const subject = createBasicSubject()
    .env('prod')
    .set(startDone)
    .id('component-instance-1')
    .build()

  assert.equal(constants.LABEL, 'lib-nats-subject.events.nats')
  assert.deepEqual(constants.SUMMARY, { subjectCount: 2 })
  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.startDone.v1.component-instance-1')
})
