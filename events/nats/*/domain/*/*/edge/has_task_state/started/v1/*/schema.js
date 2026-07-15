export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.domain.*.*.edge.has_task_state.started.v1.*",
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
        "stateId",
        "nodeId",
        "componentHash",
        "name",
        "deps",
        "type",
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
        "componentHash": { "type": "string", "minLength": 1 },
        "name": { "type": "string", "minLength": 1 },
        "deps": { "type": "object", "additionalProperties": true },
        "type": { "type": "string", "const": "task" },
        "status": { "type": "string", "const": "running" },
        "stateEdgeStatus": { "type": "string", "const": "running" },
        "updatedAt": { "type": "string", "format": "date-time" },
        "nodeId": { "type": "string", "minLength": 1 }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
