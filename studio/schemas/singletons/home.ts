import {HomeIcon} from '@sanity/icons'
import {defineField} from 'sanity'
import { PAGE_REFERENCES } from '../../constants'

const TITLE = 'Home'

export default defineField({
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero.home',
      group: 'editorial',
    }),
    defineField({
      name: 'featureCollections',
      title: 'Feature Colloections',
      type:"object",
      group: 'editorial',
      fields:[
        {
          type:"string",
          name:"title",
          title:"Section Title"
        },
        {
          type: 'featureCollections',
          name:"featureCollectionsData",

        }
      ],
      
    }),
    defineField({
      name: 'homeCollectionList',
      title: 'Collection list',
      type:"array",
      group: 'editorial',
      of:[
        {
          type:"collectionList"
        }
      ]
      
    }),
    defineField({
      name: 'homeWhoWeAre',
      title: 'Who We Are Section',
      type:"object",
      group: 'editorial',
      fields:[
         {
          type:"string",
          name:"title",
          title:"Title"
         },
         {
          type:"string",
          name:"ctaLabel",
          title:"CTA Button Label"
         },
         {
          type: 'reference',
          weak: true,
          validation: (Rule) => Rule.required(),
          to: PAGE_REFERENCES,
          title:"CTA Button URL",
          name:"ctaUrl"
         },
         {
          type: 'array',
          title:"Select Who We Are Data",
          name:"data",
          of:[
            {
              type:"whoWeAreData"
            }
          ]
         }
      
      ]
      
    }),
    defineField({
      name: 'homeImageWithText',
      title: 'Home Image With Text',
      type:"imageWithText",
      group: 'editorial',

      
    }),
    // Modules
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {type: 'module.callout'},
        {type: 'module.callToAction'},
        {type: 'module.collection'},
        {type: 'module.image'},
        {type: 'module.instagram'},
        {type: 'module.product'},
      ],
      group: 'editorial',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.home',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        // media: icon,
        subtitle: 'Index',
        title: TITLE,
      }
    },
  },
})
