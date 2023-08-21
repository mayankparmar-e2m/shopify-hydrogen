import {defineField} from 'sanity'
export default defineField({
  name: 'siteLogo',
  title: 'Site Logo',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    {
      name: 'desk_logo',
      type: 'image',
      title: 'Desktop Logo',
    },
    {
      name: 'mobile_logo',
      type: 'image',
      title: 'Mobile Logo',
    },
    {
      name: 'altText',
      type: 'string',
      title: 'Description',
    },
    {
      name: 'fevicon',
      type: 'image',
      title: 'Favicon',
      description: 'Will be scaled down to 32 x 32px',
    },
  ],
})
