// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio-rho-ten-pzq2eey1g1.vercel.app",
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
