import { events as child0Events, meta as child0Meta } from './>/index.js'
import { events as child1Events, meta as child1Meta } from './agent/index.js'
import { events as child2Events, meta as child2Meta } from './component/index.js'
import { events as child3Events, meta as child3Meta } from './componentAgent/index.js'
import { events as child4Events, meta as child4Meta } from './componentInstance/index.js'
import { events as child5Events, meta as child5Meta } from './data/index.js'
import { events as child6Events, meta as child6Meta } from './gate/index.js'
import { events as child7Events, meta as child7Meta } from './import/index.js'
import { events as child8Events, meta as child8Meta } from './task/index.js'

export const events = {
  ">": child0Events,
  "agent": child1Events,
  "component": child2Events,
  "componentAgent": child3Events,
  "componentInstance": child4Events,
  "data": child5Events,
  "gate": child6Events,
  "import": child7Events,
  "task": child8Events,
}

export const meta = {
  ">": child0Meta,
  "agent": child1Meta,
  "component": child2Meta,
  "componentAgent": child3Meta,
  "componentInstance": child4Meta,
  "data": child5Meta,
  "gate": child6Meta,
  "import": child7Meta,
  "task": child8Meta,
}
