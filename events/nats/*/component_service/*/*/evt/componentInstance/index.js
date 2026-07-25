import { events as child0Events, meta as child0Meta } from './createDone/index.js'
import { events as child1Events, meta as child1Meta } from './startDone/index.js'
import { events as child2Events, meta as child2Meta } from './state_machine_completed/index.js'

export const events = {
  "createDone": child0Events,
  "startDone": child1Events,
  "state_machine_completed": child2Events,
}

export const meta = {
  "createDone": child0Meta,
  "startDone": child1Meta,
  "state_machine_completed": child2Meta,
}
