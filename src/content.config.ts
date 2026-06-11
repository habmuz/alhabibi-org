import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const agents = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/agents" }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    category: z.enum(["productivity", "creative", "research", "utility"]),
    status: z.enum(["active", "beta", "coming-soon"]),
    icon: z.string(),
    demoType: z.enum(["iframe", "embed", "none"]),
    demoUrl: z.string().optional(),
    techStack: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { agents, blog };
