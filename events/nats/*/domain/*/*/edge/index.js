import { events as child0Events, meta as child0Meta } from './>/index.js'
import { events as child1Events, meta as child1Meta } from './has_data_state/index.js'
import { events as child2Events, meta as child2Meta } from './has_task_state/index.js'

export const events = {
  ">": child0Events,
  "has_data_state": child1Events,
  "has_task_state": child2Events,
}

export const meta = {
  ">": child0Meta,
  "has_data_state": child1Meta,
  "has_task_state": child2Meta,
}
