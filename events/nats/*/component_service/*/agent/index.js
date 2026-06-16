import { events as child0Events, meta as child0Meta } from "./evt/index.js"
import { events as child1Events, meta as child1Meta } from "./exec/index.js"

export const events = {
  "evt": child0Events,
  "exec": child1Events,
}

export const meta = {
  "evt": child0Meta,
  "exec": child1Meta,
}
