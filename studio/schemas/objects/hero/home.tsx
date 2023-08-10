import {defineField} from 'sanity'

export default defineField({
  name: 'hero.home',
  title: 'Home hero',
  type: 'array',
  of:[
   {
    type:"hero_section"
   }
  ]
})
