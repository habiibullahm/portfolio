import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const rootRelativePath = z
  .string()
  .regex(/^\/(?!\/)/, "Image must be a root-relative path like /images/...");

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    outcome: z.string(),
    client: z.string(),
    domain: z.string(),
    order: z.number(),
    /** featured = main Projects list; tool-helper = Tool Helper subsection */
    section: z.enum(["featured", "tool-helper"]).default("featured"),
    stack: z.array(z.string()).min(1),
    /** Site-relative only (OWASP: no remote/scriptable image URLs). */
    image: rootRelativePath,
    imageAlt: z.string(),
    what: z.string(),
    why: z.string(),
    how: z.string(),
    /** UI screenshots / product previews on the detail page. */
    previews: z
      .array(
        z.object({
          src: rootRelativePath,
          alt: z.string(),
        }),
      )
      .optional(),
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
