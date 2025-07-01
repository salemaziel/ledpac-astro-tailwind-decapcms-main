// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

import metaTags from 'astro-meta-tags';

import icon from 'astro-icon';




// https://astro.build/config
export default defineConfig({
    image: {
      domains: ["new.ledpac.com", "ledpac.com", "ledpac-refactor-main.netlify.app", "res.cloudinary.com", "ledpac-llc.netlify.app"],
      remotePatterns: [{ protocol: "https" }],
  },
  site: 'https://new.ledpac.com',
  integrations: [react(), tailwind(), sitemap({
    filter: (page) => !page.includes("/admin"),
    changefreq: 'weekly',
    priority: 0.7,
  }), metaTags(), icon()],
  adapter: netlify(),
});
