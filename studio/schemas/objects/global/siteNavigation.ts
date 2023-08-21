import {defineField} from 'sanity'
export default defineField({
  title: 'Site Navigation',
  type: 'array',
  options: {
    sortable: true,
  },
  name: 'siteNavigation',
  of: [{type: 'navigation'}],
})
