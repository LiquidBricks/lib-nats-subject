import test from 'node:test'
import assert from 'node:assert/strict'

import { create as createBasicSubject } from '@liquid-bricks/lib-nats-subject/create/basic'
import { create as createDiagnosticsSubject } from '@liquid-bricks/lib-nats-subject/create/diagnostics'
import { events as natsEvents, constants } from '@liquid-bricks/lib-nats-subject/events/nats'
import { events as hierarchicalEvents, meta as hierarchicalMeta } from '../../../events/nats/*/index.js'

const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')

function assertStructuredErrorSchema(errorSchema) {
  assert.deepEqual(errorSchema.required, ['name', 'message'])
  assert.equal(errorSchema.properties.name.minLength, 1)
  assert.equal(errorSchema.properties.message.type, 'string')
  assert.deepEqual(errorSchema.properties.code.type, ['string', 'number'])
}

function assertNoResultFailureProperties(properties) {
  assert.equal(properties.status.const, 'error')
  assert.equal(properties.stateEdgeStatus.const, 'error')
  assert.equal(properties.result, false)
  assert.equal(properties.resultValue, false)
  assertStructuredErrorSchema(properties.error)
}

test('NATS event tokens build publish subject with wildcard placeholders as underscores', () => {

  const subject = createBasicSubject(natsEvents['*'].domain['*']['*'].vertex.componentInstance.created.v1['*']).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.domain._._.vertex.componentInstance.created.v1._')
  assert.deepEqual(Object.keys(natsEvents['*'].domain['*']['*'].vertex.componentInstance.created.v1['*']), [])
  assert.deepEqual(natsEvents['*'].domain['*']['*'].vertex.componentInstance.created.v1['*'][SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'vertex',
    entity: 'componentInstance',
    action: 'created',
    version: 'v1',
    id: '*',
  })
})

test('NATS event tokens can initialize create directly', () => {

  const subject = createBasicSubject(natsEvents['*'].domain['*']['*'].vertex.componentInstance.created.v1['*']).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.domain._._.vertex.componentInstance.created.v1._')
})

test('NATS event export includes typed componentInstance created domain fact', () => {
  const subjectTokens = natsEvents['*'].domain['*']['*'].vertex.componentInstance.created.v1['*']
  assert.deepEqual(
    hierarchicalEvents.domain['*']['*'].vertex.componentInstance.created.v1['*'][SUBJECT_PATCH],
    subjectTokens[SUBJECT_PATCH],
  )

  const schema = hierarchicalMeta.domain['*']['*'].vertex.componentInstance.created.v1['*'].schema
  assert.deepEqual(schema.required, ['data'])
  assert.deepEqual(schema.properties.data.required, [
    'instanceId',
    'instanceVertexId',
    'componentId',
    'componentHash',
    'stateMachineId',
    'state',
    'updatedAt',
  ])
  assert.deepEqual(
    schema.properties.data.properties.state.additionalProperties,
    { type: 'null' },
  )
  assert.equal(
    Object.hasOwn(natsEvents['*'].component_service['*']['*'].evt.componentInstance, 'createDone'),
    false,
  )
  assert.equal(
    Object.hasOwn(hierarchicalEvents.component_service['*']['*'].evt.componentInstance, 'createDone'),
    false,
  )
})

test('NATS event export includes startDone and package-level constants', () => {

  const subject = createBasicSubject(natsEvents['*'].component_service['*']['*'].evt.componentInstance.startDone.v1['*']).forPublish()
    .env('prod')
    .id('component-instance-1')
    .build()

  assert.equal(constants.LABEL, 'lib-nats-subject.events.nats')
  assert.deepEqual(constants.SUMMARY, { subjectCount: 55 })
  assert.equal(subject, 'prod.component-service._._.evt.componentInstance.startDone.v1.component-instance-1')
})

test('NATS component registration is scoped to the component-agent context', () => {
  const subjectTokens = natsEvents['*'].component_service['*']['component-agent'].cmd.component.register.v1['*']
  const subject = createBasicSubject(subjectTokens).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.component-service._.component-agent.cmd.component.register.v1._')
  assert.deepEqual(subjectTokens[SUBJECT_PATCH], {
    env: '*',
    ns: 'component-service',
    tenant: '*',
    context: 'component-agent',
    channel: 'cmd',
    entity: 'component',
    action: 'register',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(
    hierarchicalEvents.component_service['*']['component-agent'].cmd.component.register.v1['*'][SUBJECT_PATCH],
    subjectTokens[SUBJECT_PATCH],
  )
  assert.equal(
    hierarchicalMeta.component_service['*']['component-agent'].cmd.component.register.v1['*'].schema.title,
    'events.nats.*.component_service.*.component-agent.cmd.component.register.v1.*',
  )
})

test('NATS event export includes injectResults', () => {
  const subject = createBasicSubject(natsEvents['*'].component_service['*']['*'].cmd.componentInstance.injectResults.v1['*']).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.component-service._._.cmd.componentInstance.injectResults.v1._')
  assert.deepEqual(
    hierarchicalMeta.component_service['*']['*'].cmd.componentInstance.injectResults.v1['*'].schema.properties.data.required,
    [
      'instanceId',
      'instanceVertexId',
      'stateMachineId',
      'stateEdgeId',
      'type',
      'result',
      'updatedAt',
    ],
  )
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
  const schema = hierarchicalMeta.component_service['*']['*'].cmd.componentInstance
    .check_state_machine_completion.v1['*'].schema
  assert.deepEqual(schema.required, ['data'])
  assert.deepEqual(
    schema.properties.data.required,
    ['instanceId', 'instanceVertexId', 'stateMachineId', 'type'],
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

test('NATS event export defines distinct provided and failed gateway compute results', () => {
  const gatewaySchema = hierarchicalMeta.gateway['*'].function_result.evt.component.compute_function.v1['*'].schema
  assert.deepEqual(gatewaySchema.required, ['instanceId', 'name', 'type', 'result', 'status'])
  assert.deepEqual(gatewaySchema.properties.instanceId, { type: 'string', minLength: 1 })
  assert.deepEqual(gatewaySchema.properties.name, { type: 'string', minLength: 1 })
  assert.deepEqual(gatewaySchema.properties.type, {
    type: 'string',
    enum: ['data', 'gate', 'task'],
  })
  assert.equal(gatewaySchema.properties.status.const, 'provided')
  assert.equal(gatewaySchema.properties.stateEdgeStatus.const, 'provided')
  assert.equal(gatewaySchema.properties.error, false)
  assert.equal(gatewaySchema.oneOf, undefined)

  const failedTokens = natsEvents['*'].gateway['*'].function_result.evt.component.compute_function_failed.v1['*']
  const failedPatch = {
    env: '*',
    ns: 'gateway',
    tenant: '*',
    context: 'function_result',
    channel: 'evt',
    entity: 'component',
    action: 'compute_function_failed',
    version: 'v1',
    id: '*',
  }
  assert.equal(
    createBasicSubject(failedTokens).forPublish().env('prod').build(),
    'prod.gateway._.function_result.evt.component.compute_function_failed.v1._',
  )
  assert.deepEqual(failedTokens[SUBJECT_PATCH], failedPatch)
  assert.deepEqual(
    hierarchicalEvents.gateway['*'].function_result.evt.component.compute_function_failed.v1['*'][SUBJECT_PATCH],
    failedPatch,
  )

  const failedSchema = hierarchicalMeta.gateway['*'].function_result.evt.component
    .compute_function_failed.v1['*'].schema
  assert.equal(
    failedSchema.title,
    'events.nats.*.gateway.*.function_result.evt.component.compute_function_failed.v1.*',
  )
  assert.deepEqual(failedSchema.required, ['instanceId', 'name', 'type', 'status', 'error'])
  assert.deepEqual(failedSchema.properties.instanceId, { type: 'string', minLength: 1 })
  assert.deepEqual(failedSchema.properties.name, { type: 'string', minLength: 1 })
  assert.deepEqual(failedSchema.properties.type, {
    type: 'string',
    enum: ['data', 'gate', 'task'],
  })
  assert.equal(failedSchema.properties.status.const, 'error')
  assert.equal(failedSchema.properties.stateEdgeStatus.const, 'error')
  assert.equal(failedSchema.properties.result, false)
  assert.equal(failedSchema.properties.resultValue, false)
  assertStructuredErrorSchema(failedSchema.properties.error)
})

test('NATS event export defines distinct provided and failed typed compute results', () => {
  for (const type of ['data', 'gate', 'task']) {
    const providedTokens = natsEvents['*'].component_service['*'].function_result.evt.component
      .compute_function.v1[type]
    const failedTokens = natsEvents['*'].component_service['*'].function_result.evt.component
      .compute_function_failed.v1[type]
    const providedPatch = {
      env: '*',
      ns: 'component-service',
      tenant: '*',
      context: 'function_result',
      channel: 'evt',
      entity: 'component',
      action: 'compute_function',
      version: 'v1',
      id: type,
    }
    const failedPatch = { ...providedPatch, action: 'compute_function_failed' }

    assert.equal(
      createBasicSubject(providedTokens).forPublish().env('prod').build(),
      `prod.component-service._.function_result.evt.component.compute_function.v1.${type}`,
    )
    assert.equal(
      createBasicSubject(failedTokens).forPublish().env('prod').build(),
      `prod.component-service._.function_result.evt.component.compute_function_failed.v1.${type}`,
    )
    assert.deepEqual(providedTokens[SUBJECT_PATCH], providedPatch)
    assert.deepEqual(failedTokens[SUBJECT_PATCH], failedPatch)
    assert.deepEqual(
      hierarchicalEvents.component_service['*'].function_result.evt.component
        .compute_function.v1[type][SUBJECT_PATCH],
      providedPatch,
    )
    assert.deepEqual(
      hierarchicalEvents.component_service['*'].function_result.evt.component
        .compute_function_failed.v1[type][SUBJECT_PATCH],
      failedPatch,
    )

    const providedSchema = hierarchicalMeta.component_service['*'].function_result.evt.component
      .compute_function.v1[type].schema.properties.data
    assert.deepEqual(providedSchema.required, ['instanceId', 'name', 'type', 'result', 'status'])
    assert.equal(providedSchema.properties.type.const, type)
    assert.deepEqual(providedSchema.properties.result, {})
    assert.equal(providedSchema.properties.status.const, 'provided')
    assert.equal(providedSchema.properties.stateEdgeStatus.const, 'provided')
    assert.equal(providedSchema.properties.error, false)

    const failedSchema = hierarchicalMeta.component_service['*'].function_result.evt.component
      .compute_function_failed.v1[type].schema.properties.data
    assert.deepEqual(failedSchema.required, ['instanceId', 'name', 'type', 'status', 'error'])
    assert.equal(failedSchema.properties.type.const, type)
    assertNoResultFailureProperties(failedSchema.properties)
  }
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
    createBasicSubject(natsEvents['*'].domain['*']['*'].edge.has_data_state.started.v1['*']).forPublish().env('prod').build(),
    'prod.domain._._.edge.has_data_state.started.v1._',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].domain['*']['*'].edge.has_task_state.result_computed.v1['*']).forPublish().env('prod').build(),
    'prod.domain._._.edge.has_task_state.result_computed.v1._',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].domain['*']['*'].edge.has_task_state.started.v1['*']).forPublish().env('prod').build(),
    'prod.domain._._.edge.has_task_state.started.v1._',
  )
  assert.equal(
    createBasicSubject(natsEvents['*'].domain['*']['*'].edge.has_gate_state.result_computed.v1['*']).forPublish().env('prod').build(),
    'prod.domain._._.edge.has_gate_state.result_computed.v1._',
  )
  assert.deepEqual(natsEvents['*'].domain['*']['*'].edge.has_data_state.started.v1['*'][SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'edge',
    entity: 'has_data_state',
    action: 'started',
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
  assert.deepEqual(natsEvents['*'].domain['*']['*'].edge.has_task_state.started.v1['*'][SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'edge',
    entity: 'has_task_state',
    action: 'started',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(natsEvents['*'].domain['*']['*'].edge.has_gate_state.result_computed.v1['*'][SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'edge',
    entity: 'has_gate_state',
    action: 'result_computed',
    version: 'v1',
    id: '*',
  })

  const expectedStateStartedFields = [
    'instanceId',
    'instanceVertexId',
    'stateMachineId',
    'stateEdgeId',
    'stateId',
    'nodeId',
    'componentHash',
    'name',
    'deps',
    'type',
    'status',
    'stateEdgeStatus',
    'updatedAt',
  ]
  assert.deepEqual(
    hierarchicalMeta.domain['*']['*'].edge.has_data_state.started.v1['*'].schema.properties.data.required,
    expectedStateStartedFields,
  )
  assert.deepEqual(
    hierarchicalMeta.domain['*']['*'].edge.has_task_state.started.v1['*'].schema.properties.data.required,
    expectedStateStartedFields,
  )
  assert.equal(
    hierarchicalMeta.domain['*']['*'].edge.has_data_state.started.v1['*'].schema.properties.data.additionalProperties,
    true,
  )
  assert.equal(
    hierarchicalMeta.domain['*']['*'].edge.has_task_state.started.v1['*'].schema.properties.data.additionalProperties,
    true,
  )
})

test('NATS event export includes typed injection source fact', () => {
  const subjectTokens = natsEvents['*'].domain['*']['*'].edge.injects_into.injected.v1['*']
  const subject = createBasicSubject(subjectTokens).forPublish()
    .env('prod')
    .id('source-state-edge')
    .build()

  assert.equal(subject, 'prod.domain._._.edge.injects_into.injected.v1.source-state-edge')
  assert.deepEqual(subjectTokens[SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'edge',
    entity: 'injects_into',
    action: 'injected',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(
    hierarchicalEvents.domain['*']['*'].edge.injects_into.injected.v1['*'][SUBJECT_PATCH],
    subjectTokens[SUBJECT_PATCH],
  )

  const schema = hierarchicalMeta.domain['*']['*'].edge.injects_into.injected.v1['*'].schema
  assert.equal(schema.title, 'events.nats.*.domain.*.*.edge.injects_into.injected.v1.*')
  assert.deepEqual(schema.required, ['data'])
  assert.deepEqual(schema.properties.data.required, [
    'instanceId',
    'instanceVertexId',
    'stateMachineId',
    'stateEdgeId',
    'type',
    'result',
    'updatedAt',
  ])
  assert.deepEqual(schema.properties.data.properties.type.enum, ['data', 'task'])
  assert.deepEqual(schema.properties.data.properties.result, {})
  assert.equal(schema.properties.data.required.includes('result'), true)
  assert.equal(schema.additionalProperties, true)
  assert.equal(schema.properties.data.additionalProperties, true)
})

test('NATS event export describes distinct result-computed and computation-failed domain facts', () => {
  const entityByType = {
    data: 'has_data_state',
    gate: 'has_gate_state',
    task: 'has_task_state',
  }

  for (const [type, entity] of Object.entries(entityByType)) {
    const providedTokens = natsEvents['*'].domain['*']['*'].edge[entity].result_computed.v1['*']
    const failedTokens = natsEvents['*'].domain['*']['*'].edge[entity].computation_failed.v1['*']
    const providedPatch = {
      env: '*',
      ns: 'domain',
      tenant: '*',
      context: '*',
      channel: 'edge',
      entity,
      action: 'result_computed',
      version: 'v1',
      id: '*',
    }
    const failedPatch = { ...providedPatch, action: 'computation_failed' }

    assert.equal(
      createBasicSubject(providedTokens).forPublish().env('prod').build(),
      `prod.domain._._.edge.${entity}.result_computed.v1._`,
    )
    assert.equal(
      createBasicSubject(failedTokens).forPublish().env('prod').build(),
      `prod.domain._._.edge.${entity}.computation_failed.v1._`,
    )
    assert.deepEqual(providedTokens[SUBJECT_PATCH], providedPatch)
    assert.deepEqual(failedTokens[SUBJECT_PATCH], failedPatch)
    assert.deepEqual(
      hierarchicalEvents.domain['*']['*'].edge[entity].result_computed.v1['*'][SUBJECT_PATCH],
      providedPatch,
    )
    assert.deepEqual(
      hierarchicalEvents.domain['*']['*'].edge[entity].computation_failed.v1['*'][SUBJECT_PATCH],
      failedPatch,
    )

    const providedSchema = hierarchicalMeta.domain['*']['*'].edge[entity]
      .result_computed.v1['*'].schema
    const providedRequired = [
      'instanceId',
      'instanceVertexId',
      'stateMachineId',
      'stateEdgeId',
      ...(type === 'gate' ? ['gateInstanceRefId'] : []),
      'type',
      'name',
      'result',
      'status',
      'stateEdgeStatus',
      'updatedAt',
    ]

    assert.deepEqual(providedSchema.required, ['data'])
    assert.deepEqual(providedSchema.properties.data.required, providedRequired)
    assert.equal(providedSchema.properties.data.properties.type.const, type)
    assert.deepEqual(providedSchema.properties.data.properties.result, {})
    assert.equal(providedSchema.properties.data.properties.resultValue.type, 'string')
    assert.equal(providedSchema.properties.data.properties.status.const, 'provided')
    assert.equal(providedSchema.properties.data.properties.stateEdgeStatus.const, 'provided')
    assert.equal(providedSchema.properties.data.properties.error, false)

    const failedSchema = hierarchicalMeta.domain['*']['*'].edge[entity]
      .computation_failed.v1['*'].schema
    const failedRequired = [
      'instanceId',
      'instanceVertexId',
      'stateMachineId',
      'stateEdgeId',
      ...(type === 'gate' ? ['gateInstanceRefId'] : []),
      'type',
      'name',
      'status',
      'stateEdgeStatus',
      'error',
      'updatedAt',
    ]

    assert.deepEqual(failedSchema.required, ['data'])
    assert.deepEqual(failedSchema.properties.data.required, failedRequired)
    assert.equal(failedSchema.properties.data.properties.type.const, type)
    assertNoResultFailureProperties(failedSchema.properties.data.properties)
  }
})

test('NATS event export includes distinct snapshot result and computation-failed subjects', () => {
  for (const type of ['data', 'gate', 'task']) {
    const providedTokens = natsEvents['*'].domain['*']['*'].snapshot[type].result.v1['*']
    const failedTokens = natsEvents['*'].domain['*']['*'].snapshot[type].computation_failed.v1['*']
    const providedPatch = {
      env: '*',
      ns: 'domain',
      tenant: '*',
      context: '*',
      channel: 'snapshot',
      entity: type,
      action: 'result',
      version: 'v1',
      id: '*',
    }
    const failedPatch = { ...providedPatch, action: 'computation_failed' }

    assert.equal(
      createBasicSubject(providedTokens).forSubscribe().build(),
      `*.domain.*.*.snapshot.${type}.result.v1.*`,
    )
    assert.equal(
      createBasicSubject(providedTokens).forPublish().env('prod').build(),
      `prod.domain._._.snapshot.${type}.result.v1._`,
    )
    assert.equal(
      createBasicSubject(failedTokens).forSubscribe().build(),
      `*.domain.*.*.snapshot.${type}.computation_failed.v1.*`,
    )
    assert.equal(
      createBasicSubject(failedTokens).forPublish().env('prod').build(),
      `prod.domain._._.snapshot.${type}.computation_failed.v1._`,
    )
    assert.deepEqual(providedTokens[SUBJECT_PATCH], providedPatch)
    assert.deepEqual(failedTokens[SUBJECT_PATCH], failedPatch)
    assert.deepEqual(
      hierarchicalEvents.domain['*']['*'].snapshot[type].result.v1['*'][SUBJECT_PATCH],
      providedPatch,
    )
    assert.deepEqual(
      hierarchicalEvents.domain['*']['*'].snapshot[type].computation_failed.v1['*'][SUBJECT_PATCH],
      failedPatch,
    )

    const providedSchema = hierarchicalMeta.domain['*']['*'].snapshot[type].result.v1['*'].schema
    assert.equal(providedSchema.title, `events.nats.*.domain.*.*.snapshot.${type}.result.v1.*`)
    assert.equal(providedSchema.type, 'object')
    assert.equal(providedSchema.additionalProperties, true)
    assert.deepEqual(providedSchema.properties.data.required, [
      'instanceId',
      'instanceVertexId',
      'componentStateId',
      'stateMachineId',
      'stateEdgeId',
      ...(type === 'gate' ? ['gateInstanceRefId'] : []),
      'type',
      'name',
      'delta',
      'status',
      'stateEdgeStatus',
      'updatedAt',
    ])
    assert.equal(providedSchema.properties.data.properties.type.const, type)
    assert.equal(Object.hasOwn(providedSchema.properties.data.properties, 'result'), false)
    assert.equal(providedSchema.properties.data.properties.status.const, 'provided')
    assert.equal(providedSchema.properties.data.properties.stateEdgeStatus.const, 'provided')
    assert.equal(providedSchema.properties.data.properties.error, false)

    const failedSchema = hierarchicalMeta.domain['*']['*'].snapshot[type]
      .computation_failed.v1['*'].schema
    assert.equal(
      failedSchema.title,
      `events.nats.*.domain.*.*.snapshot.${type}.computation_failed.v1.*`,
    )
    assert.deepEqual(failedSchema.properties.data.required, [
      'instanceId',
      'instanceVertexId',
      'componentStateId',
      'stateMachineId',
      'stateEdgeId',
      ...(type === 'gate' ? ['gateInstanceRefId'] : []),
      'type',
      'name',
      'delta',
      'status',
      'stateEdgeStatus',
      'error',
      'updatedAt',
    ])
    assert.equal(failedSchema.properties.data.properties.type.const, type)
    const failedDeltaSchema = failedSchema.properties.data.properties.delta
    assert.equal(failedDeltaSchema.minProperties, 1)
    assert.equal(failedDeltaSchema.maxProperties, 1)
    assert.equal(failedDeltaSchema.propertyNames.pattern, `^${type}\\..+\\.state$`)
    assert.deepEqual(failedDeltaSchema.additionalProperties, { const: 'error' })
    assertNoResultFailureProperties(failedSchema.properties.data.properties)
  }
})

test('NATS event export includes distinct data and task snapshot state subjects', () => {
  for (const type of ['data', 'task']) {
    const subjectTokens = natsEvents['*'].domain['*']['*'].snapshot[type].state.v1['*']
    const expectedPatch = {
      env: '*',
      ns: 'domain',
      tenant: '*',
      context: '*',
      channel: 'snapshot',
      entity: type,
      action: 'state',
      version: 'v1',
      id: '*',
    }

    assert.equal(
      createBasicSubject(subjectTokens).forSubscribe().build(),
      `*.domain.*.*.snapshot.${type}.state.v1.*`,
    )
    assert.equal(
      createBasicSubject(subjectTokens).forPublish().env('prod').context('delta').build(),
      `prod.domain._.delta.snapshot.${type}.state.v1._`,
    )
    assert.deepEqual(subjectTokens[SUBJECT_PATCH], expectedPatch)
    assert.deepEqual(
      hierarchicalEvents.domain['*']['*'].snapshot[type].state.v1['*'][SUBJECT_PATCH],
      expectedPatch,
    )

    const schema = hierarchicalMeta.domain['*']['*'].snapshot[type].state.v1['*'].schema
    assert.equal(schema.title, `events.nats.*.domain.*.*.snapshot.${type}.state.v1.*`)
    assert.deepEqual(schema.properties.data.required, [
      'instanceId',
      'instanceVertexId',
      'componentStateId',
      'stateMachineId',
      'stateEdgeId',
      'type',
      'name',
      'state',
      'delta',
      'updatedAt',
    ])
    assert.equal(schema.properties.data.properties.type.const, type)
    assert.equal(schema.properties.data.properties.state.type, 'string')
  }
})

test('NATS event export includes instance snapshot state subjects', () => {
  const subjectTokens = natsEvents['*'].domain['*']['*'].snapshot.instance.state.v1['*']
  const expectedPatch = {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'snapshot',
    entity: 'instance',
    action: 'state',
    version: 'v1',
    id: '*',
  }

  assert.equal(
    createBasicSubject(subjectTokens).forPublish().env('prod').context('delta').build(),
    'prod.domain._.delta.snapshot.instance.state.v1._',
  )
  assert.deepEqual(subjectTokens[SUBJECT_PATCH], expectedPatch)
  assert.deepEqual(
    hierarchicalEvents.domain['*']['*'].snapshot.instance.state.v1['*'][SUBJECT_PATCH],
    expectedPatch,
  )

  const schema = hierarchicalMeta.domain['*']['*'].snapshot.instance.state.v1['*'].schema
  assert.deepEqual(schema.properties.data.required, [
    'instanceId',
    'instanceVertexId',
    'componentStateId',
    'stateMachineId',
    'type',
    'name',
    'delta',
    'updatedAt',
  ])
  assert.equal(schema.properties.data.properties.type.const, 'instance')
  assert.equal(schema.properties.data.properties.name.const, 'state')
  assert.deepEqual(
    schema.properties.data.properties.delta.properties['instance.state'].enum,
    ['created', 'running', 'complete'],
  )
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
  const schema = hierarchicalMeta.domain['*']['*'].vertex.stateMachine.completed.v1['*'].schema
  assert.deepEqual(schema.required, ['data'])
  assert.deepEqual(
    schema.properties.data.required,
    ['instanceId', 'stateMachineId', 'updatedAt'],
  )
})

test('NATS event export includes typed stateMachine started domain fact', () => {
  const subjectTokens = natsEvents['*'].domain['*']['*'].vertex.stateMachine.started.v1['*']
  const subject = createBasicSubject(subjectTokens).forPublish()
    .env('prod')
    .build()

  assert.equal(subject, 'prod.domain._._.vertex.stateMachine.started.v1._')
  assert.deepEqual(subjectTokens[SUBJECT_PATCH], {
    env: '*',
    ns: 'domain',
    tenant: '*',
    context: '*',
    channel: 'vertex',
    entity: 'stateMachine',
    action: 'started',
    version: 'v1',
    id: '*',
  })
  assert.deepEqual(
    hierarchicalEvents.domain['*']['*'].vertex.stateMachine.started.v1['*'][SUBJECT_PATCH],
    subjectTokens[SUBJECT_PATCH],
  )

  const schema = hierarchicalMeta.domain['*']['*'].vertex.stateMachine.started.v1['*'].schema
  assert.deepEqual(schema.required, ['data'])
  assert.deepEqual(schema.properties.data.required, [
    'instanceId',
    'instanceVertexId',
    'stateMachineId',
    'state',
    'dataStateIds',
    'taskStateIds',
    'importInstanceIds',
    'gateInstanceIds',
    'updatedAt',
  ])
  assert.equal(schema.properties.data.additionalProperties, true)
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
