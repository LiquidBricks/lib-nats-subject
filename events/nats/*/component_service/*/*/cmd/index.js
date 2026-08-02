import { events as child0Events, meta as child0Meta } from './>/index.js'
import { events as child1Events, meta as child1Meta } from './agent/index.js'
import { events as child2Events, meta as child2Meta } from './componentAgent/index.js'
import { events as child3Events, meta as child3Meta } from './componentInstance/index.js'
import { events as child4Events, meta as child4Meta } from './data/index.js'
import { events as child5Events, meta as child5Meta } from './gate/index.js'
import { events as child6Events, meta as child6Meta } from './import/index.js'
import { events as child7Events, meta as child7Meta } from './task/index.js'

export const events = {
  ">": child0Events,
  "agent": child1Events,
  "componentAgent": child2Events,
  "componentInstance": child3Events,
  "data": child4Events,
  "gate": child5Events,
  "import": child6Events,
  "task": child7Events,
}

export const meta = {
  ">": child0Meta,
  "agent": child1Meta,
  "componentAgent": child2Meta,
  "componentInstance": child3Meta,
  "data": child4Meta,
  "gate": child5Meta,
  "import": child6Meta,
  "task": child7Meta,
}
