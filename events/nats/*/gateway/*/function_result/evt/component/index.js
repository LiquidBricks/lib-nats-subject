import { events as child0Events, meta as child0Meta } from './compute_function/index.js'
import { events as child1Events, meta as child1Meta } from './compute_function_failed/index.js'

export const events = {
  "compute_function": child0Events,
  "compute_function_failed": child1Events,
}

export const meta = {
  "compute_function": child0Meta,
  "compute_function_failed": child1Meta,
}
