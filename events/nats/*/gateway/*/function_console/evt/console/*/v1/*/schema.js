export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.gateway.*.function_console.evt.console.*.v1.*",
  "type": "object",
  "required": ["instanceId", "name", "type", "method", "args"],
  "properties": {
    "instanceId": { "type": "string", "minLength": 1 },
    "name": { "type": "string", "minLength": 1 },
    "type": { "type": "string", "enum": ["data", "gate", "task"] },
    "method": { "type": "string", "minLength": 1 },
    "args": { "type": "array", "items": {} }
  },
  "additionalProperties": true
}
