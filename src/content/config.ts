import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    expires: z.boolean().optional(),
    heroImage: image().refine((img) => img.width >= 1080, {
      message: "Cover image must be at least 1080 pixels wide!",
    }).optional(),
    unsplash: z.string().optional(),
    unsplashURL: z.string().optional(),
    description: z.string().optional(),
  }),
});


export const collections = { 
  blog, 
 };
