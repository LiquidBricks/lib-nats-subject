import test from 'node:test'
import assert from 'node:assert/strict'

import { create as createBasicSubject } from '@liquid-bricks/lib-nats-subject/create/basic'
import { create as createDiagnosticsSubject } from '@liquid-bricks/lib-nats-subject/create/diagnostics'
import { events as natsEvents, constants } from '@liquid-bricks/lib-nats-subject/events/nats'
import { events as hierarchicalEvents } from '../../../events/nats/*/index.js'

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
  assert.deepEqual(constants.SUMMARY, { subjectCount: 34 })
  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.startDone.v1.component-instance-1')
})

test('NATS event export includes processInjectedComputeResultDone', () => {
  const subject = createBasicSubject(natsEvents['*'].component_service['*']['*'].evt.componentInstance.processInjectedComputeResultDone.v1['*']).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.processInjectedComputeResultDone.v1._')
})

test('NATS event export includes injectResults', () => {
  const subject = createBasicSubject(natsEvents['*'].component_service['*']['*'].cmd.componentInstance.injectResults.v1['*']).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.component-service._._.cmd.componentInstance.injectResults.v1._')
})

test('NATS event export includes check_state_machine_completion command', () => {
  const subjectTokens = natsEvents['*'].component_service['*']['*'].cmd.componentInstance.check_state_machine_completion.v1['*']
  const subject = createBasicSubject(subjectTokens).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.component-service._._.cmd.componentInstance.check_state_machine_completion.v1._')
  assert.deepEqual(subjectTokens[SUBJECT_PATCH], {
    env: '*',
    ns: 'component-service',
    tenant: '*',
    context: '*',
    channel: 'cmd',
    entity: 'componentInstance',
    action: 'check_state_machine_completion',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(
    hierarchicalEvents.component_service['*']['*'].cmd.componentInstance.check_state_machine_completion.v1['*'][SUBJECT_PATCH],
    subjectTokens[SUBJECT_PATCH],
  )
})

test('NATS event export includes command and execution subjects', () => {

  assert.equal(
    createBasicSubject(natsEvents['*'].component_service['*']['*'].cmd.componentInstance.start.v1['*']).forPublish().env('prod').build(),
    'prod.component-service._._.cmd.componentInstance.start.v1._',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].gateway['*']['*'].cmd.component.compute_function.v1['*']).forPublish().env('prod').build(),
    'prod.gateway._._.cmd.component.compute_function.v1._',
  )
  assert.equal(
    createBasicSubject(natsEvents["*"].agent["*"]["*"].cmd.component.compute_function.v1["*"]).forPublish().env("prod").build(),
    "prod.agent._._.cmd.component.compute_function.v1._",
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].gateway['*'].function_result.evt.component.compute_function.v1['*']).forPublish().env('prod').build(),
    'prod.gateway._.function_result.evt.component.compute_function.v1._',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].component_service['*'].function_result.evt.component.compute_function.v1.data).forPublish().env('prod').build(),
    'prod.component-service._.function_result.evt.component.compute_function.v1.data',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].component_service['*'].function_result.evt.component.compute_function.v1.gate).forPublish().env('prod').build(),
    'prod.component-service._.function_result.evt.component.compute_function.v1.gate',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].component_service['*'].function_result.evt.component.compute_function.v1.task).forPublish().env('prod').build(),
    'prod.component-service._.function_result.evt.component.compute_function.v1.task',
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

test('NATS event export includes domain fact subjects', () => {
  assert.equal(
    createBasicSubject(natsEvents['*'].domain['*']['*'].edge['>']).forSubscribe().env('prod').build(),
    'prod.domain.*.*.edge.>',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].domain['*']['*'].edge.has_data_state.result_computed.v1['*']).forPublish().env('prod').build(),
    'prod.domain._._.edge.has_data_state.result_computed.v1._',
  )
  assert.deepEqual(natsEvents['*'].domain['*']['*'].edge.has_data_state.result_computed.v1['*'][SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'edge',
    entity: 'has_data_state',
    action: 'result_computed',
    version: 'v1',
    id: '*',
  })
  assert.equal(
    createBasicSubject(natsEvents['*'].domain['*']['*'].edge.uses_gate.result_computed.v1['*']).forPublish().env('prod').build(),
    'prod.domain._._.edge.uses_gate.result_computed.v1._',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].domain['*']['*'].edge.has_task_state.result_computed.v1['*']).forPublish().env('prod').build(),
    'prod.domain._._.edge.has_task_state.result_computed.v1._',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].domain['*']['*'].vertex.gateInstanceRef.result_computed.v1['*']).forPublish().env('prod').build(),
    'prod.domain._._.vertex.gateInstanceRef.result_computed.v1._',
  )
  assert.deepEqual(natsEvents['*'].domain['*']['*'].edge.uses_gate.result_computed.v1['*'][SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'edge',
    entity: 'uses_gate',
    action: 'result_computed',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(natsEvents['*'].domain['*']['*'].edge.has_task_state.result_computed.v1['*'][SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'edge',
    entity: 'has_task_state',
    action: 'result_computed',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(natsEvents['*'].domain['*']['*'].vertex.gateInstanceRef.result_computed.v1['*'][SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'vertex',
    entity: 'gateInstanceRef',
    action: 'result_computed',
    version: 'v1',
    id: '*',
  })
})

test('NATS event export includes stateMachine completed domain fact', () => {
  const subjectTokens = natsEvents['*'].domain['*']['*'].vertex.stateMachine.completed.v1['*']
  const subject = createBasicSubject(subjectTokens).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.domain._._.vertex.stateMachine.completed.v1._')
  assert.deepEqual(subjectTokens[SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'vertex',
    entity: 'stateMachine',
    action: 'completed',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(
    hierarchicalEvents.domain['*']['*'].vertex.stateMachine.completed.v1['*'][SUBJECT_PATCH],
    subjectTokens[SUBJECT_PATCH],
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
