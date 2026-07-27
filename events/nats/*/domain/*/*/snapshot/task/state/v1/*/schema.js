export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.domain.*.*.snapshot.task.state.v1.*",
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "object",
      "required": [
        "instanceId",
        "instanceVertexId",
        "componentStateId",
        "stateMachineId",
        "stateEdgeId",
        "type",
        "name",
        "state",
        "delta",
        "updatedAt"
      ],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "instanceVertexId": { "type": "string", "minLength": 1 },
        "componentStateId": { "type": "string", "minLength": 1 },
        "stateMachineId": { "type": "string", "minLength": 1 },
        "stateEdgeId": { "type": "string", "minLength": 1 },
        "type": { "const": "task" },
        "name": { "type": "string", "minLength": 1 },
        "state": { "type": "string", "minLength": 1 },
        "delta": { "type": "object", "minProperties": 1 },
        "updatedAt": {
          "type": "string",
          "format": "date-time",
          "pattern": "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"
        }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
