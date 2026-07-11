import test from 'node:test'
import assert from 'node:assert/strict'

import { router } from '../../../subjectFactory/index.js'
import { create as createSubject } from '@liquid-bricks/lib-nats-subject/create/basic'
import { events as natsEvents } from '@liquid-bricks/lib-nats-subject/events/nats'

test('handler can build a subject from its route context', async () => {
  const context = {
    'edge.has_task_state.result_computed':
      natsEvents['*'].domain['*']['*'].edge.has_task_state.result_computed.v1['*'],
  }
  let publishedSubject
  const r = router({ tokens: ['a'] })

  r.route({ a: 'task-result' }, {
    context,
    handler({ routeCtx }) {
      publishedSubject = createSubject(routeCtx['edge.has_task_state.result_computed'])
        .forPublish()
        .env('prod')
        .build()
    },
  })

  await r.request({ subject: 'task-result' })

  assert.equal(
    publishedSubject,
    'prod.domain._._.edge.has_task_state.result_computed.v1._',
  )
})

test('route context is available only to hooks declared by that spec', async () => {
  const configuredSubject = { subject: '*.domain.*.*.edge.has_task_state.result_computed.v1.*' }
  const context = { publication: configuredSubject }
  const calls = []

  const capture = (name, result) => ({ routeCtx }) => {
    assert.deepEqual(routeCtx, context)
    calls.push(name)
    return result
  }

  const captureRouterHook = (name) => ({ routeCtx }) => {
    assert.deepEqual(routeCtx, {})
    calls.push(name)
  }

  const r = router({ tokens: ['a'] })
    .before(captureRouterHook('before'))
    .after(captureRouterHook('after'))
    .beforeEach(({ routeCtx, stage }) => {
      assert.deepEqual(routeCtx, {})
      calls.push('beforeEach:' + stage)
    })
    .afterEach(({ routeCtx, stage }) => {
      assert.deepEqual(routeCtx, {})
      calls.push('afterEach:' + stage)
    })

  r.route({ a: 'x' }, {
    context,
    decode: capture('decode'),
    pre: {
      first: capture('pre:first'),
      second: capture('pre:second'),
    },
    handler: capture('handler', 'handled'),
    post: capture('post'),
  })

  await r.request({ subject: 'x' })

  for (const expected of [
    'before',
    'decode',
    'pre:first',
    'pre:second',
    'handler',
    'post',
    'after',
    'beforeEach:decode',
    'beforeEach:pre',
    'beforeEach:handler',
    'beforeEach:post',
    'afterEach:decode',
    'afterEach:pre',
    'afterEach:handler',
    'afterEach:post',
  ]) {
    assert.ok(calls.includes(expected), expected)
  }

  assert.deepEqual(r.routes[0].config.context, context)
})

test('route contexts are isolated to the matched route spec', async () => {
  const firstValue = { value: 'first' }
  const secondValue = { value: 'second' }
  const seen = []
  const r = router({ tokens: ['a'] })

  r.route({ a: 'first' }, {
    context: { result: firstValue },
    handler({ routeCtx }) {
      seen.push(routeCtx.result)
    },
  })
  r.route({ a: 'second' }, {
    context: { result: secondValue },
    handler({ routeCtx }) {
      seen.push(routeCtx.result)
    },
  })

  await r.request({ subject: 'first' })
  await r.request({ subject: 'second' })

  assert.deepEqual(seen, [firstValue, secondValue])
})

test('nested route contexts stay local to the hooks that declared them', async () => {
  const parentValue = { value: 'parent' }
  const childValue = { value: 'child' }
  const seen = []
  const r = router({ tokens: ['a', 'b'] })

  r.route({ a: 'x' }, {
    context: { value: parentValue, parentOnly: true },
    pre: [
      ({ routeCtx }) => seen.push([
        'pre',
        routeCtx.value,
        routeCtx.parentOnly,
        routeCtx.childOnly,
      ]),
    ],
    children: [[
      { a: 'x', b: 'y' },
      {
        context: { value: childValue, childOnly: true },
        handler: ({ routeCtx }) => seen.push([
          'handler',
          routeCtx.value,
          routeCtx.parentOnly,
          routeCtx.childOnly,
        ]),
      },
    ]],
  })

  await r.request({ subject: 'x.y' })

  assert.deepEqual(seen, [
    ['pre', parentValue, true, undefined],
    ['handler', childValue, undefined, true],
  ])
})

test('default and error hooks receive their route context', async () => {
  const errorValue = { value: 'error' }
  const seen = []
  const r = router({ tokens: ['a'] })

  r.default({
    context: { errorValue },
    pre: [() => { throw new Error('boom') }],
    handler() {},
    onPreError: [({ routeCtx, error }) => {
      seen.push([routeCtx.errorValue, error.message])
      return { handled: true }
    }],
  })

  const { scope } = await r.request({ subject: 'missing' })

  assert.deepEqual(seen, [[errorValue, 'boom']])
  assert.equal(scope.handled, true)
})
