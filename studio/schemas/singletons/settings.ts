import {CogIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'
const TITLE = 'Settings'
export default defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'general_setting',
      title: 'General',
    },
    {
      name: 'notFoundPage',
      title: '404 page',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // site Logo
    defineField({
      name: 'siteLogo',
      title: 'Site Logo',
      type: 'siteLogo',
      group: 'general_setting',
    }),
    // brand Information
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'brandInformation',
      group: 'general_setting',
    }),
    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      group: 'general_setting',
      description: 'Add a Social Media platform URL.',
      options: {collapsible: true, collapsed: true, columns: 2},
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'pinterest',
          title: 'Pinterest',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
      ],
    }),
    // Store Header Bar
    defineField({
      name: 'headerBar',
      title: 'Header Bar',
      type: 'object',
      group: 'general_setting',
      options: {collapsible: true, collapsed: true},
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'reference',
          weak: true,
          to: [{type: 'collection'}],
        },
      ],
    }),
    defineField({
      name: 'footerIcons',
      title: 'footer Icons',
      type: 'array',
      group: 'general_setting',
      of: [
        {
          type: 'footerIcons',
        },
      ],
    }),
    // Not found page
    defineField({
      name: 'notFoundPage',
      title: '404 page',
      type: 'notFoundPage',
      group: 'notFoundPage',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
