import {defineField} from 'sanity'

export default defineField({
  name: 'whoWeAreData',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'string',
      name: 'subtitle',
      title: 'Subtitle',
    },
    defineField({
      name: 'image',
      title: 'Icon',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
