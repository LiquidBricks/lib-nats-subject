export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.domain.*.*.vertex.stateMachine.completed.v1.*",
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "object",
      "required": ["instanceId", "stateMachineId", "updatedAt"],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "stateMachineId": { "type": "string", "minLength": 1 },
        "updatedAt": { "type": "string", "format": "date-time" }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
