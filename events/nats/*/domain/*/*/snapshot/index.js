import { events as child0Events, meta as child0Meta } from './data/index.js'
import { events as child1Events, meta as child1Meta } from './gate/index.js'
import { events as child2Events, meta as child2Meta } from './instance/index.js'
import { events as child3Events, meta as child3Meta } from './task/index.js'
import { events as child4Events, meta as child4Meta } from './log/index.js'

export const events = {
  "data": child0Events,
  "gate": child1Events,
  "instance": child2Events,
  "task": child3Events,
  "log": child4Events,
}

export const meta = {
  "data": child0Meta,
  "gate": child1Meta,
  "instance": child2Meta,
  "task": child3Meta,
  "log": child4Meta,
}
