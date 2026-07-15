import { events as child0Events, meta as child0Meta } from './check_state_machine_completion/index.js'
import { events as child1Events, meta as child1Meta } from './create/index.js'
import { events as child2Events, meta as child2Meta } from './injectResults/index.js'
import { events as child3Events, meta as child3Meta } from './start/index.js'
import { events as child4Events, meta as child4Meta } from './start_dependants/index.js'

export const events = {
  "check_state_machine_completion": child0Events,
  "create": child1Events,
  "injectResults": child2Events,
  "start": child3Events,
  "start_dependants": child4Events,
}

export const meta = {
  "check_state_machine_completion": child0Meta,
  "create": child1Meta,
  "injectResults": child2Meta,
  "start": child3Meta,
  "start_dependants": child4Meta,
}
