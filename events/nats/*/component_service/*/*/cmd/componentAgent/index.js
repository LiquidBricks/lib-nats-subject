import { events as child0Events, meta as child0Meta } from './register/index.js'
import { events as child1Events, meta as child1Meta } from './registerComponent/index.js'

export const events = {
  "register": child0Events,
  "registerComponent": child1Events,
}

export const meta = {
  "register": child0Meta,
  "registerComponent": child1Meta,
}
