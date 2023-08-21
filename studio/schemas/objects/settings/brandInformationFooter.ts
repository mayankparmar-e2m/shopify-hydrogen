import {defineField} from 'sanity'
export default defineField({
  name: 'brandInformation',
  title: 'Brand Information',
  type: 'object',
  description: "Add a brand description to your store's footer.",
  options: {
    collapsed: true,
    collapsible: true,
  },
  fields: [
    {
      name: 'footerLogo',
      type: 'image',
      title: 'Logo',
    },
    {
      name: 'brandHeader',
      type: 'body',
      title: 'Headline',
    },
    {
      name: 'brandDescription',
      type: 'body',
      title: 'Description',
    },
  ],
})
