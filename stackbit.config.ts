// stackbit.config.ts
import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "22.14.0",
  // Astro to run inside Visual Editor container
  devCommand: "node_modules/.bin/astro dev --port {PORT} --hostname 127.0.0.1",
  // Astro-specific configuration
  experimental: {
    ssg: {
      name: "Astro",
      logPatterns: {
        up: ["is ready", "astro"]
      },
      directRoutes: {
        "socket.io": "socket.io"
      },
      passthrough: ["/vite-hmr/**"]
    }
  },
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content'],
      models: [
        {
          name: 'Product',
          type: 'data',
          filePath: 'src/content/products/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'description', type: 'text', required: true },
            { name: 'slug', type: 'string', required: true },
            { name: 'isDraft', type: 'boolean', default: false },
            { name: 'image', type: 'image', required: false },
            { name: 'pageImage', type: 'image', required: false },
            { name: 'pageType', type: 'string', required: false },
          ]
        },
        {
          name: 'Portfolio',
          type: 'data',
          filePath: 'src/content/portfolio/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'description', type: 'text', required: true },
            { name: 'slug', type: 'string', required: true },
            { name: 'isDraft', type: 'boolean', default: false },
            { name: 'image', type: 'image', required: false },
            { name: 'pageImage', type: 'image', required: false },
            { name: 'pageType', type: 'string', required: false },
          ]
        },
        {
          name: 'Page',
          type: 'page',
          filePath: 'src/content/pages/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'description', type: 'text', required: true },
            { name: 'slug', type: 'string', required: false },
            { name: 'image', type: 'image', required: false },
            { name: 'pageImage', type: 'image', required: false },
            { name: 'pageType', type: 'string', required: false },
          ]
        }
      ],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
      }
    })
  ],
});
