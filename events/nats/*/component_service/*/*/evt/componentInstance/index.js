import { events as child0Events, meta as child0Meta } from './computeResultDone/index.js'
import { events as child1Events, meta as child1Meta } from './createDone/index.js'
import { events as child2Events, meta as child2Meta } from './startDone/index.js'
import { events as child3Events, meta as child3Meta } from './state_machine_completed/index.js'

export const events = {
  "computeResultDone": child0Events,
  "createDone": child1Events,
  "startDone": child2Events,
  "state_machine_completed": child3Events,
}

export const meta = {
  "computeResultDone": child0Meta,
  "createDone": child1Meta,
  "startDone": child2Meta,
  "state_machine_completed": child3Meta,
}
