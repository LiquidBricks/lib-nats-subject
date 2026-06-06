import { schema } from './schema.js'

const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')

export const events = {
  [SUBJECT_PATCH]: {
      "root": "tele",
      "tail": ">"
  },
}

export const meta = {
  schema,
}
