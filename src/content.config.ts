import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    outcome: z.string(),
    client: z.string(),
    domain: z.string(),
    order: z.number(),
    image: z.string(),
    imageAlt: z.string(),
    draft: z.boolean().default(false),
    links: z
      .object({
        live: z.string().url().optional(),
        repo: z.string().url().optional(),
      })
      .optional(),
  }),
});

export const collections = { projects };
