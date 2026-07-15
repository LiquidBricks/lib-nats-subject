export const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "events.nats.*.component_service.*.*.cmd.componentInstance.check_state_machine_completion.v1.*",
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "object",
      "required": ["instanceId", "instanceVertexId", "stateMachineId", "type"],
      "properties": {
        "instanceId": { "type": "string", "minLength": 1 },
        "instanceVertexId": { "type": "string", "minLength": 1 },
        "stateMachineId": { "type": "string", "minLength": 1 },
        "stateEdgeId": { "type": "string", "minLength": 1 },
        "stateEdgeStatus": { "type": "string", "minLength": 1 },
        "status": { "type": "string", "minLength": 1 },
        "gateInstanceRefId": { "type": "string", "minLength": 1 },
        "type": { "type": "string", "enum": ["data", "task", "gate"] },
        "result": {},
        "resultValue": { "type": "string" }
      },
      "allOf": [
        {
          "if": {
            "properties": { "type": { "enum": ["data", "task"] } },
            "required": ["type"]
          },
          "then": {
            "required": ["stateEdgeId"],
            "anyOf": [
              { "required": ["stateEdgeStatus"] },
              { "required": ["status"] }
            ]
          }
        },
        {
          "if": {
            "properties": { "type": { "const": "gate" } },
            "required": ["type"]
          },
          "then": {
            "required": ["gateInstanceRefId"],
            "anyOf": [
              { "required": ["result"] },
              { "required": ["resultValue"] }
            ]
          }
        }
      ],
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
