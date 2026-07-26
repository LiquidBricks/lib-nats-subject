export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.domain.*.*.vertex.componentInstance.created.v1.*",
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "object",
      "required": [
        "instanceId",
        "instanceVertexId",
        "componentId",
        "componentHash",
        "stateMachineId",
        "state",
        "updatedAt"
      ],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "instanceVertexId": { "type": "string", "minLength": 1 },
        "componentId": { "type": "string", "minLength": 1 },
        "componentHash": { "type": "string", "minLength": 1 },
        "stateMachineId": { "type": "string", "minLength": 1 },
        "state": {
          "type": "object",
          "additionalProperties": { "type": "null" }
        },
        "updatedAt": { "type": "string", "format": "date-time" }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
