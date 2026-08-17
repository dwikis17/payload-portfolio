import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    defaultColumns: ['title', 'publishedAt', '_status'],
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', index: true, required: true, unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'publishedAt', type: 'date' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
  ],
  versions: {
    drafts: true,
  },
}
