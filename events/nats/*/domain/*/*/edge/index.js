import { events as child0Events, meta as child0Meta } from './>/index.js'
import { events as child1Events, meta as child1Meta } from './has_data_state/index.js'
import { events as child2Events, meta as child2Meta } from './has_gate_state/index.js'
import { events as child3Events, meta as child3Meta } from './has_task_state/index.js'
import { events as child4Events, meta as child4Meta } from './injects_into/index.js'

export const events = {
  ">": child0Events,
  "has_data_state": child1Events,
  "has_gate_state": child2Events,
  "has_task_state": child3Events,
  "injects_into": child4Events,
}

export const meta = {
  ">": child0Meta,
  "has_data_state": child1Meta,
  "has_gate_state": child2Meta,
  "has_task_state": child3Meta,
  "injects_into": child4Meta,
}
