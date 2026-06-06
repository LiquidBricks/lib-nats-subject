import * as constants from './constants.js'
import { events as childEvents, meta as childMeta } from './*/index.js'
import { events as teleEvents, meta as teleMeta } from './tele/index.js'
import { events as metricsEvents, meta as metricsMeta } from './metrics/index.js'

export const events = {
  '*': childEvents,
  tele: teleEvents,
  metrics: metricsEvents,
}

export const meta = {
  constants,
  '*': childMeta,
  tele: teleMeta,
  metrics: metricsMeta,
}

export { constants }
