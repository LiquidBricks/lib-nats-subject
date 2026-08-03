import { events as child0Events, meta as child0Meta } from './result_computed/index.js'
import { events as child1Events, meta as child1Meta } from './started/index.js'
import { events as child2Events, meta as child2Meta } from './computation_failed/index.js'

export const events = {
  "result_computed": child0Events,
  "started": child1Events,
  "computation_failed": child2Events,
}

export const meta = {
  "result_computed": child0Meta,
  "started": child1Meta,
  "computation_failed": child2Meta,
}
