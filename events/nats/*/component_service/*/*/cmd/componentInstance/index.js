import { events as child0Events, meta as child0Meta } from './create/index.js'
import { events as child1Events, meta as child1Meta } from './start/index.js'
import { events as child2Events, meta as child2Meta } from './start_dependants/index.js'

export const events = {
  "create": child0Events,
  "start": child1Events,
  "start_dependants": child2Events,
}

export const meta = {
  "create": child0Meta,
  "start": child1Meta,
  "start_dependants": child2Meta,
}
