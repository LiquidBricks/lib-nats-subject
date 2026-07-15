import { events as child0Events, meta as child0Meta } from './completed/index.js'
import { events as child1Events, meta as child1Meta } from './started/index.js'

export const events = {
  "completed": child0Events,
  "started": child1Events,
}

export const meta = {
  "completed": child0Meta,
  "started": child1Meta,
}
