import {defineField} from 'sanity'

export default defineField({
  name: 'footerIcons',
  title: 'footer Icons',
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
        name:"altText",
        title:"Alt Text",
        type:"string"
    }),
  ],
})