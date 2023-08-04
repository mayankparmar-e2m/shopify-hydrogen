import { LinkIcon } from '@sanity/icons'
import {defineField} from 'sanity'
import { PAGE_REFERENCES } from "../../../constants"
export default defineField({
    name: 'navigation',
    title: 'menuLinks',
    type: 'object',
    icon: LinkIcon,
    options:{
    collapsed:true
    },
    fields:[
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          // Reference
          {
            name: 'reference',
            type: 'reference',
            weak: false,
            validation: (Rule) => Rule.required(),
            to: PAGE_REFERENCES,
          },
    ],
    preview: {
    select:{
      title:"title"
    },
    prepare(selection) {
        return {
            title:selection.title
        }
    }
  }
  })