import ShopifyDocumentStatus from '../../../components/media/ShopifyDocumentStatus'
import {defineField} from 'sanity'

export default defineField({
    name:"featureCollectionsObj",
    title:"Feature Collections",
    type:"object",
    fields:[
        defineField({
            name:"title",
            type:"string",
            title:"Title",

        }),
       // Reference
       defineField({
        name: 'reference',
        type: 'reference',
        weak: true,
        validation: (Rule) => Rule.required(),
        to: [ {type: 'collection'}],
      }),
    ],
    preview: {
        select: {
            name: 'title',
            imageUrl:"reference.store.imageUrl"
        },
        prepare(selection) {
          const {name,imageUrl} = selection
          return {

            title:name,
          }
        },
      },
})