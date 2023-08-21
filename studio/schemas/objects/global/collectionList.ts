import {defineField} from 'sanity'

export default defineField({
  name: 'collectionList',
  title: 'collection list',
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
      name: 'url',
      type: 'reference',
      weak: true,
      validation: (Rule) => Rule.required(),
      to: [{type: 'collection'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
