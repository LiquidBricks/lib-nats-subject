export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.domain.*.*.edge.has_log.*.v1.*",
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "object",
      "required": ["instanceId", "logId", "name", "type", "method", "args", "updatedAt"],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "logId": { "type": "string", "minLength": 1 },
        "name": { "type": "string", "minLength": 1 },
        "type": { "type": "string", "enum": ["data", "gate", "task"] },
        "method": { "type": "string", "minLength": 1 },
        "args": { "type": "array", "items": {} },
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
