export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.gateway.*.function_result.evt.component.compute_function_failed.v1.*",
  "type": "object",
  "required": ["instanceId", "name", "type", "status", "error"],
  "properties": {
    "instanceId": { "type": "string", "minLength": 1 },
    "name": { "type": "string", "minLength": 1 },
    "type": { "type": "string", "enum": ["data", "gate", "task"] },
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
    "resultValue": false
  },
  "additionalProperties": true
}
