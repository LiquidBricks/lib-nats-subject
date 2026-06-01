import { events as child0Events, meta as child0Meta } from './cmd/index.js'
import { events as child1Events, meta as child1Meta } from './evt/index.js'
import { events as child2Events, meta as child2Meta } from './exec/index.js'

export const events = {
  "cmd": child0Events,
  "evt": child1Events,
  "exec": child2Events,
}

export const meta = {
  "cmd": child0Meta,
  "evt": child1Meta,
  "exec": child2Meta,
}
