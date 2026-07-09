import { events as child0Events, meta as child0Meta } from './>/index.js'
import { events as child1Events, meta as child1Meta } from './has_data_state/index.js'
import { events as child2Events, meta as child2Meta } from './has_task_state/index.js'
import { events as child3Events, meta as child3Meta } from './uses_gate/index.js'

export const events = {
  ">": child0Events,
  "has_data_state": child1Events,
  "has_task_state": child2Events,
  "uses_gate": child3Events,
}

export const meta = {
  ">": child0Meta,
  "has_data_state": child1Meta,
  "has_task_state": child2Meta,
  "uses_gate": child3Meta,
}
