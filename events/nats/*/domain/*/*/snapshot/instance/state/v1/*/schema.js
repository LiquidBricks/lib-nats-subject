export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.domain.*.*.snapshot.instance.state.v1.*",
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
        "type",
        "name",
        "delta",
        "updatedAt"
      ],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "instanceVertexId": { "type": "string", "minLength": 1 },
        "componentStateId": { "type": "string", "minLength": 1 },
        "stateMachineId": { "type": "string", "minLength": 1 },
        "type": { "const": "instance" },
        "name": { "const": "state" },
        "delta": {
          "type": "object",
          "required": ["instance.state"],
          "properties": {
            "instance.state": {
              "enum": ["created", "running", "complete"]
            }
          },
          "additionalProperties": false
        },
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
