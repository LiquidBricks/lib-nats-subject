import { events as child0Events, meta as child0Meta } from './edge/index.js'
import { events as child1Events, meta as child1Meta } from './snapshot/index.js'
import { events as child2Events, meta as child2Meta } from './vertex/index.js'

export const events = {
  "edge": child0Events,
  "snapshot": child1Events,
  "vertex": child2Events,
}

export const meta = {
  "edge": child0Meta,
  "snapshot": child1Meta,
  "vertex": child2Meta,
}
