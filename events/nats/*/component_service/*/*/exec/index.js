import { events as child0Events, meta as child0Meta } from './>/index.js'
import { events as child1Events, meta as child1Meta } from './component/index.js'
import { events as child2Events, meta as child2Meta } from './componentAgent/index.js'

export const events = {
  ">": child0Events,
  "component": child1Events,
  "componentAgent": child2Events,
}

export const meta = {
  ">": child0Meta,
  "component": child1Meta,
  "componentAgent": child2Meta,
}
