import test from 'node:test'
import assert from 'node:assert/strict'

import { create as createBasicSubject } from '@liquid-bricks/lib-nats-subject/create/basic'
import { create as createDiagnosticsSubject } from '@liquid-bricks/lib-nats-subject/create/diagnostics'
import { events as natsEvents, constants } from '@liquid-bricks/lib-nats-subject/events/nats'

const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')

test('NATS event tokens build publish subject with wildcard placeholders as underscores', () => {

  const subject = createBasicSubject(natsEvents['*'].component_service['*']['*'].evt.componentInstance.createDone.v1['*']).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.createDone.v1._')
  assert.deepEqual(Object.keys(natsEvents['*'].component_service['*']['*'].evt.componentInstance.createDone.v1['*']), [])
  assert.deepEqual(natsEvents['*'].component_service['*']['*'].evt.componentInstance.createDone.v1['*'][SUBJECT_PATCH], {
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

  const subject = createBasicSubject(natsEvents['*'].component_service['*']['*'].evt.componentInstance.createDone.v1['*']).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.createDone.v1._')
})

test('NATS event export includes startDone and package-level constants', () => {

  const subject = createBasicSubject(natsEvents['*'].component_service['*']['*'].evt.componentInstance.startDone.v1['*']).forPublish()
    .env('prod')
    .id('component-instance-1')
    .build()

  assert.equal(constants.LABEL, 'lib-nats-subject.events.nats')
  assert.deepEqual(constants.SUMMARY, { subjectCount: 24 })
  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.startDone.v1.component-instance-1')
})

test('NATS event export includes command and execution subjects', () => {

  assert.equal(
    createBasicSubject(natsEvents['*'].component_service['*']['*'].cmd.componentInstance.start.v1['*']).forPublish().env('prod').build(),
    'prod.component-service._._.cmd.componentInstance.start.v1._',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].component_service['*']['*'].exec.component.compute_result.v1['*']).forPublish().env('prod').build(),
    'prod.component-service._._.exec.component.compute_result.v1._',
  )
})


test('NATS event export includes component service stream filter subjects', () => {
  assert.equal(
    createBasicSubject(natsEvents['*'].component_service['*']['*'].cmd['>']).forSubscribe().build(),
    '*.component-service.*.*.cmd.>',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].component_service['*']['*'].evt['>']).forSubscribe().build(),
    '*.component-service.*.*.evt.>',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].component_service['*']['*'].exec['>']).forSubscribe().env('prod').build(),
    'prod.component-service.*.*.exec.>',
  )
})

test('NATS event export includes diagnostics stream filter subjects', () => {
  assert.equal(
    createDiagnosticsSubject(natsEvents.tele['>']).forSubscribe().build(),
    'tele.>',
  )
  assert.equal(
    createDiagnosticsSubject(natsEvents.metrics['>']).forSubscribe().build(),
    'metrics.>',
  )
})
