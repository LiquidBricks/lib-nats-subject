import { schema } from './schema.js'

const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')

export const events = {
  [SUBJECT_PATCH]: {
      "env": "*",
      "ns": "component-service",
      "tenant": "*",
      "context": "*",
      "channel": "exec",
      "entity": ">"
  },
}

export const meta = {
  schema,
}
