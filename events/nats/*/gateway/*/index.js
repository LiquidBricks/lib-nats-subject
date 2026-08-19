import { events as child0Events, meta as child0Meta } from './*/index.js'
import { events as child1Events, meta as child1Meta } from './function_result/index.js'
import { events as child2Events, meta as child2Meta } from './function_console/index.js'

export const events = {
  "*": child0Events,
  "function_result": child1Events,
  "function_console": child2Events,
}

export const meta = {
  "*": child0Meta,
  "function_result": child1Meta,
  "function_console": child2Meta,
}
