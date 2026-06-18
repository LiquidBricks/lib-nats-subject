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
            component: {
              register: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "cmd", "entity": "component", "action": "register", "version": "v1", "id": "*"}),
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
              computeResultDone: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "evt", "entity": "component", "action": "computeResultDone", "version": "v1", "id": "*"}),
                },
              },
              registerDone: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "evt", "entity": "component", "action": "registerDone", "version": "v1", "id": "*"}),
                },
              },
            },
            componentInstance: {
              computeResultDone: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "evt", "entity": "componentInstance", "action": "computeResultDone", "version": "v1", "id": "*"}),
                },
              },
              createDone: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "evt", "entity": "componentInstance", "action": "createDone", "version": "v1", "id": "*"}),
                },
              },
              processInjectedComputeResultDone: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "*", "channel": "evt", "entity": "componentInstance", "action": "processInjectedComputeResultDone", "version": "v1", "id": "*"}),
                },
              },
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
        agent: {
          evt: {
            component: {
              computeResultDone: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "agent", "channel": "evt", "entity": "component", "action": "computeResultDone", "version": "v1", "id": "*"}),
                },
              },
            },
          },
          exec: {
            component: {
              compute_result: {
                v1: {
                  "*": subjectPatch({"env": "*", "ns": "component-service", "tenant": "*", "context": "agent", "channel": "exec", "entity": "component", "action": "compute_result", "version": "v1", "id": "*"}),
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
