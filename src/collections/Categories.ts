import { CollectionConfig, slugField} from "payload";


export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        slugField({
            useAsSlug: "name",
        }),
        {
            name: 'Name',
            required: true,
            type: 'text',
        }
    ],
};
