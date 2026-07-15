export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.domain.*.*.vertex.stateMachine.started.v1.*",
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "object",
      "required": [
        "instanceId",
        "instanceVertexId",
        "stateMachineId",
        "state",
        "dataStateIds",
        "taskStateIds",
        "importInstanceIds",
        "gateInstanceIds",
        "updatedAt"
      ],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "instanceVertexId": { "type": "string", "minLength": 1 },
        "stateMachineId": { "type": "string", "minLength": 1 },
        "state": { "type": "string", "const": "running" },
        "dataStateIds": {
          "type": "array",
          "items": { "type": "string", "minLength": 1 }
        },
        "taskStateIds": {
          "type": "array",
          "items": { "type": "string", "minLength": 1 }
        },
        "importInstanceIds": {
          "type": "array",
          "items": { "type": "string", "minLength": 1 }
        },
        "gateInstanceIds": {
          "type": "array",
          "items": { "type": "string", "minLength": 1 }
        },
        "updatedAt": { "type": "string", "format": "date-time" }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
