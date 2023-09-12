import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    expires: z.boolean().optional(),
    heroImage: image().optional(),
    unsplash: z.string().optional(),
    unsplashURL: z.string().optional(),
    description: z.string().optional(),
  }),
});


export const collections = { 
  blog, 
 };
