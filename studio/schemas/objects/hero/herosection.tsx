import {defineField} from 'sanity'
export default defineField({
    name:"hero_section",
    type:"object",
    title:"Hero Section",
    fields:[
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
          }),
          defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
          }),
          // Link
          defineField({
            name: 'links',
            title: 'Link',
            type: 'linkInternal',
          }),
          defineField({
            name: 'desk_image',
            title: 'Desktop Image',
            type: 'image',
            options: {hotspot: true}
          }),
          defineField({
            name: 'mob_image',
            title: 'Mobile Image',
            type: 'image',
            options: {hotspot: true}
          })
    ]
})
