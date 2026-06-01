import * as constants from './constants.js'
import { events as childEvents, meta as childMeta } from './*/index.js'

export const events = {
  '*': childEvents,
}

export const meta = {
  constants,
  '*': childMeta,
}

export { constants }
