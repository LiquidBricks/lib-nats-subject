import { schema } from './schema.js'
import { createSubjectPatchFromUrl } from '../../../../../../_subjectPatch.js'

export const events = createSubjectPatchFromUrl(import.meta.url)

export const meta = {
  schema,
}
