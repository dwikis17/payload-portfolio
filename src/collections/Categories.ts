import { slugField, type CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    defaultColumns: ['name', 'slug', 'updatedAt'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    slugField({
      useAsSlug: 'name',
    }),
    {
      name: 'name',
      required: true,
      type: 'text',
    },
  ],
}
