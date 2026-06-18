import { events as child0Events, meta as child0Meta } from './>/index.js'
import { events as child1Events, meta as child1Meta } from './componentAgent/index.js'

export const events = {
  ">": child0Events,
  "componentAgent": child1Events,
}

export const meta = {
  ">": child0Meta,
  "componentAgent": child1Meta,
}
