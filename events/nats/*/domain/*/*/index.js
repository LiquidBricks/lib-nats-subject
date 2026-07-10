import { events as child0Events, meta as child0Meta } from './edge/index.js'
import { events as child1Events, meta as child1Meta } from './vertex/index.js'

export const events = {
  "edge": child0Events,
  "vertex": child1Events,
}

export const meta = {
  "edge": child0Meta,
  "vertex": child1Meta,
}
