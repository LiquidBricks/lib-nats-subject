import { events as child0Events, meta as child0Meta } from './result/index.js'
import { events as child1Events, meta as child1Meta } from './computation_failed/index.js'

export const events = {
  "result": child0Events,
  "computation_failed": child1Events,
}

export const meta = {
  "result": child0Meta,
  "computation_failed": child1Meta,
}
