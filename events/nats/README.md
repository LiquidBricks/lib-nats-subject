# NATS Events

Event folders follow the basic NATS subject token order:

`<env>/<ns>/<tenant>/<context>/<channel>/<entity>/<action>/<version>/<id>`

Wildcard tokens are literal `*` directories. Leaf modules export plain token patches through `events`; metadata such as constants and schema is available as non-enumerable properties on each leaf.

## Compute outcome taxonomy

Compute success and failure are distinct facts at every routing boundary; a failure is never multiplexed onto a success action.

- Gateway and component-service component events retain the operation name: `compute_function` for a provided result and `compute_function_failed` for a structured error.
- Domain edge facts describe the state transition: `result_computed` for a provided result and `computation_failed` for a failed computation.
- Domain snapshot facts use `result` for a provided result and `computation_failed` for a failed computation.

Failure payloads carry structured error metadata and do not carry `result` or `resultValue`.
