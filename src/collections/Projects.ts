import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    defaultColumns: ['title', 'year', 'featured', 'order'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', index: true, required: true, unique: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'impact', type: 'textarea', required: true },
    { name: 'year', type: 'number', required: true },
    {
      name: 'technologies',
      type: 'array',
      fields: [{ name: 'technology', type: 'text', required: true }],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'Optional images shown alongside the cover on the project page.',
        isSortable: true,
      },
    },
    {
      name: 'content',
      label: 'Description',
      type: 'richText',
      required: true,
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0, required: true },
  ],
}
