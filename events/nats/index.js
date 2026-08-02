import * as constants from './constants.js'

const SUBJECT_PATCH = Symbol.for('@liquid-bricks/lib-nats-subject.subjectPatch')

const subjectPatch = (patch) => Object.freeze({
  [SUBJECT_PATCH]: Object.freeze(patch),
})

export const events = {
  "*": {
    component_service: {
      "*": {
        "*": {
          cmd: {
            ">": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": ">"}),
            agent: {
              register_components: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "agent", "action": "register_components", "version": "v1", "id": "*"}),
                },
              },
            },
            componentAgent: {
              register: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "componentAgent", "action": "register", "version": "v1", "id": "*"}),
                },
              },
              registerComponent: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "componentAgent", "action": "registerComponent", "version": "v1", "id": "*"}),
                },
              },
            },
            componentInstance: {
              check_state_machine_completion: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "componentInstance", "action": "check_state_machine_completion", "version": "v1", "id": "*"}),
                },
              },
              create: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "componentInstance", "action": "create", "version": "v1", "id": "*"}),
                },
              },
              injectResults: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "componentInstance", "action": "injectResults", "version": "v1", "id": "*"}),
                },
              },
              start: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "componentInstance", "action": "start", "version": "v1", "id": "*"}),
                },
              },
              start_dependants: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "componentInstance", "action": "start_dependants", "version": "v1", "id": "*"}),
                },
              },
            },
            data: {
              start: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "data", "action": "start", "version": "v1", "id": "*"}),
                },
              },
            },
            gate: {
              start: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "gate", "action": "start", "version": "v1", "id": "*"}),
                },
              },
            },
            "import": {
              start: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "import", "action": "start", "version": "v1", "id": "*"}),
                },
              },
            },
            task: {
              start: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "task", "action": "start", "version": "v1", "id": "*"}),
                },
              },
            },
          },
          evt: {
            ">": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "evt", "entity": ">"}),
            component: {
              registerDone: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "evt", "entity": "component", "action": "registerDone", "version": "v1", "id": "*"}),
                },
              },
            },
            componentInstance: {
              startDone: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "evt", "entity": "componentInstance", "action": "startDone", "version": "v1", "id": "*"}),
                },
              },
              state_machine_completed: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "evt", "entity": "componentInstance", "action": "state_machine_completed", "version": "v1", "id": "*"}),
                },
              },
            },
          },
          exec: {
            ">": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "exec", "entity": ">"}),
            componentAgent: {
              cmdRegisterProvidingAgentsComponent: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "exec", "entity": "componentAgent", "action": "cmdRegisterProvidingAgentsComponent", "version": "v1", "id": "*"}),
                },
              },
            },
          },
        },
        "component-agent": {
          cmd: {
            component: {
              register: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "component-agent", "channel": "cmd", "entity": "component", "action": "register", "version": "v1", "id": "*"}),
                },
              },
            },
          },
        },
        function_result: {
          evt: {
            component: {
              compute_function: {
                v1: {
                  data: subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "function_result", "channel": "evt", "entity": "component", "action": "compute_function", "version": "v1", "id": "data"}),
                  gate: subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "function_result", "channel": "evt", "entity": "component", "action": "compute_function", "version": "v1", "id": "gate"}),
                  task: subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "function_result", "channel": "evt", "entity": "component", "action": "compute_function", "version": "v1", "id": "task"}),
                },
              },
            },
          },
        },
      },
    },
    domain: {
      "*": {
        "*": {
          edge: {
            ">": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "edge", "entity": ">"}),
            has_data_state: {
              result_computed: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "edge", "entity": "has_data_state", "action": "result_computed", "version": "v1", "id": "*"}),
                },
              },
              started: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "edge", "entity": "has_data_state", "action": "started", "version": "v1", "id": "*"}),
                },
              },
            },
            has_gate_state: {
              result_computed: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "edge", "entity": "has_gate_state", "action": "result_computed", "version": "v1", "id": "*"}),
                },
              },
            },
            has_task_state: {
              result_computed: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "edge", "entity": "has_task_state", "action": "result_computed", "version": "v1", "id": "*"}),
                },
              },
              started: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "edge", "entity": "has_task_state", "action": "started", "version": "v1", "id": "*"}),
                },
              },
            },
            injects_into: {
              injected: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "edge", "entity": "injects_into", "action": "injected", "version": "v1", "id": "*"}),
                },
              },
            },
          },
          snapshot: {
            data: {
              result: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "snapshot", "entity": "data", "action": "result", "version": "v1", "id": "*"}),
                },
              },
              state: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "snapshot", "entity": "data", "action": "state", "version": "v1", "id": "*"}),
                },
              },
            },
            gate: {
              result: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "snapshot", "entity": "gate", "action": "result", "version": "v1", "id": "*"}),
                },
              },
            },
            instance: {
              state: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "snapshot", "entity": "instance", "action": "state", "version": "v1", "id": "*"}),
                },
              },
            },
            task: {
              result: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "snapshot", "entity": "task", "action": "result", "version": "v1", "id": "*"}),
                },
              },
              state: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "snapshot", "entity": "task", "action": "state", "version": "v1", "id": "*"}),
                },
              },
            },
          },
          vertex: {
            componentInstance: {
              created: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "vertex", "entity": "componentInstance", "action": "created", "version": "v1", "id": "*"}),
                },
              },
            },
            stateMachine: {
              completed: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "vertex", "entity": "stateMachine", "action": "completed", "version": "v1", "id": "*"}),
                },
              },
              started: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "domain", "tenant": "*", "context": "*", "channel": "vertex", "entity": "stateMachine", "action": "started", "version": "v1", "id": "*"}),
                },
              },
            },
          },
        },
      },
    },
    gateway: {
      "*": {
        "*": {
          cmd: {
            component: {
              compute_function: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "gateway", "tenant": "*", "context": "*", "channel": "cmd", "entity": "component", "action": "compute_function", "version": "v1", "id": "*"}),
                },
              },
            },
          },
        },
        function_result: {
          evt: {
            component: {
              compute_function: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "gateway", "tenant": "*", "context": "function_result", "channel": "evt", "entity": "component", "action": "compute_function", "version": "v1", "id": "*"}),
                },
              },
            },
          },
        },
      },
    },
    agent: {
      "*": {
        "*": {
          cmd: {
            component: {
              compute_function: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "agent", "tenant": "*", "context": "*", "channel": "cmd", "entity": "component", "action": "compute_function", "version": "v1", "id": "*"}),
                },
              },
            },
          },
        },
      },
    },
  },
  metrics: {
    ">": subjectPatch({"root": "metrics", "tail": ">"}),
  },
  tele: {
    ">": subjectPatch({"root": "tele", "tail": ">"}),
  },
}

export const meta = {
  constants,
  ...events,
}

export { constants }
