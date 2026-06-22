import { events as dataEvents, meta as dataMeta } from './data/index.js'
import { events as gateEvents, meta as gateMeta } from './gate/index.js'
import { events as taskEvents, meta as taskMeta } from './task/index.js'

export const events = {
  data: dataEvents,
  gate: gateEvents,
  task: taskEvents,
}

export const meta = {
  data: dataMeta,
  gate: gateMeta,
  task: taskMeta,
}
