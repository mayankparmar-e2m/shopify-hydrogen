import {defineField} from 'sanity'
import {PAGE_REFERENCES} from '../../../constants'
export default defineField({
  name: 'imageWithText',
  title: 'Image With Text',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    // Links
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'body',
    }),
    {
      type: 'string',
      name: 'ctaLabel',
      title: 'CTA Button Label',
    },
    {
      type: 'reference',
      weak: true,
      validation: (Rule) => Rule.required(),
      to: PAGE_REFERENCES,
      title: 'CTA Button URL',
      name: 'ctaUrl',
    },
  ],
})
