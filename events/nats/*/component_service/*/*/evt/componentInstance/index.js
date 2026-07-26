import { events as child0Events, meta as child0Meta } from './startDone/index.js'
import { events as child1Events, meta as child1Meta } from './state_machine_completed/index.js'

export const events = {
  "startDone": child0Events,
  "state_machine_completed": child1Events,
}

export const meta = {
  "startDone": child0Meta,
  "state_machine_completed": child1Meta,
}
