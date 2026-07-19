import { events as child0Events, meta as child0Meta } from './data/index.js'
import { events as child1Events, meta as child1Meta } from './gate/index.js'
import { events as child2Events, meta as child2Meta } from './task/index.js'

export const events = {
  "data": child0Events,
  "gate": child1Events,
  "task": child2Events,
}

export const meta = {
  "data": child0Meta,
  "gate": child1Meta,
  "task": child2Meta,
}
