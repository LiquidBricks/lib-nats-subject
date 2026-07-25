export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.component_service.*.function_result.evt.component.compute_function.v1.data",
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "object",
      "required": ["instanceId", "name", "result"],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "name": { "type": "string", "minLength": 1 },
        "result": {}
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
