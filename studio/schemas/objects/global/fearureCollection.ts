import {defineField} from 'sanity'

export default defineField({
  name: 'featureCollections',
  title: 'Feature Collections',
  type: 'array',
  of: [{type: 'featureCollectionsObj'}],
})
