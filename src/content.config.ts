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
    /** Site-relative only (OWASP: no remote/scriptable image URLs). */
    image: z
      .string()
      .regex(/^\/(?!\/)/, "Image must be a root-relative path like /images/..."),
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
