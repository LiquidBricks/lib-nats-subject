export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.domain.*.*.edge.has_task_state.result_computed.v1.*",
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "object",
      "required": [
        "instanceId",
        "instanceVertexId",
        "stateMachineId",
        "stateEdgeId",
        "type",
        "name",
        "result",
        "status",
        "stateEdgeStatus",
        "updatedAt"
      ],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "instanceVertexId": { "type": "string", "minLength": 1 },
        "stateMachineId": { "type": "string", "minLength": 1 },
        "stateEdgeId": { "type": "string", "minLength": 1 },
        "stateId": { "type": "string", "minLength": 1 },
        "type": { "const": "task" },
        "name": { "type": "string", "minLength": 1 },
        "result": {},
        "resultValue": { "type": "string" },
        "status": { "const": "provided" },
        "stateEdgeStatus": { "const": "provided" },
        "error": false,
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
