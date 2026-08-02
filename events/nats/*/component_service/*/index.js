import { events as child0Events, meta as child0Meta } from "./*/index.js"
import { events as child1Events, meta as child1Meta } from "./component-agent/index.js"
import { events as child2Events, meta as child2Meta } from "./function_result/index.js"

export const events = {
  "*": child0Events,
  "component-agent": child1Events,
  "function_result": child2Events,
}

export const meta = {
  "*": child0Meta,
  "component-agent": child1Meta,
  "function_result": child2Meta,
}
