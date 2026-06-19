import { events as child0Events, meta as child0Meta } from './component_service/index.js'
import { events as child1Events, meta as child1Meta } from './gateway/index.js'
import { events as child2Events, meta as child2Meta } from './agent/index.js'

export const events = {
  "component_service": child0Events,
  "gateway": child1Events,
  "agent": child2Events,
}

export const meta = {
  "component_service": child0Meta,
  "gateway": child1Meta,
  "agent": child2Meta,
}
