import { events as child0Events, meta as child0Meta } from './create/index.js'
import { events as child1Events, meta as child1Meta } from './injectResults/index.js'
import { events as child2Events, meta as child2Meta } from './start/index.js'
import { events as child3Events, meta as child3Meta } from './start_dependants/index.js'

export const events = {
  "create": child0Events,
  "injectResults": child1Events,
  "start": child2Events,
  "start_dependants": child3Events,
}

export const meta = {
  "create": child0Meta,
  "injectResults": child1Meta,
  "start": child2Meta,
  "start_dependants": child3Meta,
}
