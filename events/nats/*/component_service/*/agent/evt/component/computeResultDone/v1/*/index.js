import { schema } from "./schema.js"

const SUBJECT_PATCH = Symbol.for("@liquid-bricks/lib-nats-subject.subjectPatch")

export const events = {
  [SUBJECT_PATCH]: {
    env: "*",
    ns: "component-service",
    tenant: "*",
    context: "agent",
    channel: "evt",
    entity: "component",
    action: "computeResultDone",
    version: "v1",
    id: "*",
  },
}

export const meta = {
  schema,
}
