import { events as child0Events, meta as child0Meta } from './result/index.js'
import { events as child1Events, meta as child1Meta } from './state/index.js'
import { events as child2Events, meta as child2Meta } from './computation_failed/index.js'

export const events = {
  "result": child0Events,
  "state": child1Events,
  "computation_failed": child2Events,
}

export const meta = {
  "result": child0Meta,
  "state": child1Meta,
  "computation_failed": child2Meta,
}
