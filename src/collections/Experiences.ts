import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    defaultColumns: ['role', 'company', 'startDate', 'current', 'order'],
    useAsTitle: 'role',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'company', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    { name: 'current', type: 'checkbox', defaultValue: false },
    { name: 'employmentType', type: 'text' },
    { name: 'location', type: 'text' },
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'highlight', type: 'textarea', required: true }],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, required: true },
  ],
}
