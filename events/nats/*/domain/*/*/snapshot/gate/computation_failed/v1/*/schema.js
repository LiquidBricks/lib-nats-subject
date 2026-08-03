export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.domain.*.*.snapshot.gate.computation_failed.v1.*",
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
        "gateInstanceRefId",
        "type",
        "name",
        "delta",
        "status",
        "stateEdgeStatus",
        "error",
        "updatedAt"
      ],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "instanceVertexId": { "type": "string", "minLength": 1 },
        "componentStateId": { "type": "string", "minLength": 1 },
        "stateMachineId": { "type": "string", "minLength": 1 },
        "stateEdgeId": { "type": "string", "minLength": 1 },
        "gateInstanceRefId": { "type": "string", "minLength": 1 },
        "type": { "const": "gate" },
        "name": { "type": "string", "minLength": 1 },
        "delta": {
          "type": "object",
          "minProperties": 1,
          "maxProperties": 1,
          "propertyNames": { "pattern": "^gate\\..+\\.state$" },
          "additionalProperties": { "const": "error" }
        },
        "status": { "const": "error" },
        "stateEdgeStatus": { "const": "error" },
        "error": {
          "type": "object",
          "required": ["name", "message"],
          "properties": {
            "name": { "type": "string", "minLength": 1 },
            "message": { "type": "string" },
            "code": { "type": ["string", "number"] }
          },
          "additionalProperties": true
        },
        "result": false,
        "resultValue": false,
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
