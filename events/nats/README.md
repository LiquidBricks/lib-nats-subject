# NATS Events

Event folders follow the basic NATS subject token order:

`<env>/<ns>/<tenant>/<context>/<channel>/<entity>/<action>/<version>/<id>`

Wildcard tokens are literal `*` directories. Leaf modules export plain token patches through `events`; metadata such as constants and schema is available as non-enumerable properties on each leaf.
