export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.component_service.*.function_result.evt.component.compute_function.v1.task",
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "object",
      "required": ["instanceId", "name", "type", "result", "status"],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "name": { "type": "string", "minLength": 1 },
        "type": { "const": "task" },
        "result": {},
        "status": { "const": "provided" },
        "stateEdgeStatus": { "const": "provided" },
        "error": false
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
