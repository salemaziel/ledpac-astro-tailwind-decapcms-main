import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';


// Define the products collection schema
const products = defineCollection({
  	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/products" }),
    schema:  ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        slug: z.string().optional(),
        publishDate: z.date().optional(),
        isDraft: z.boolean().default(false),
        image: z.union([image(), z.string()]).optional(), // Allow both processed images and string URLs
        pageImage: z.string().optional(), // Optional page image field
        componentName: z.string().optional(),
        pageType: z.enum(['product', 'article']).default('product'),
  }),
});

// Define the portfolio collection schema
const portfolio = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/portfolio" }),
  schema: ({ image }) => 
    z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    publishDate: z.date().optional(),
    isDraft: z.boolean().default(false),
    image: z.union([image(), z.string()]).optional(), // Allow both processed images and string URLs
    pageImage: z.string().optional(), // Optional page image field
    componentName: z.string().optional(),
    pageType: z.enum(['article', 'portfolio']).default('article'),
  }),
});

// Define the pages collection schema
const pages = defineCollection({
  schema: ({ image }) => 
    z.object({ 
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    publishDate: z.date().optional(),
    isDraft: z.boolean().default(false),
    image: z.union([image(), z.string()]).optional(), // Allow both processed images and string URLs
    pageImage: z.string().optional(), // Optional page image field
    componentName: z.string().optional(),
    pageType: z.string().optional(),
    heroSection: z.object({
      'hero-h1-title': z.string().optional(),
      'hero-subtitle': z.string().optional(),
      'hero-image-1': z.string().optional(),
      'hero-image-2': z.string().optional(),
      'hero-image-3': z.string().optional(),
      'hero-image-4': z.string().optional(),
      enableButton: z.boolean().default(true),
      buttonText: z.string().default('Get An Estimate'),
      buttonUrl: z.string().default('/products/#product-form'),
    }).optional(),
    featuresSection: z.object({
      'content-h2-title': z.string(),
      'content-features-paragraph': z.string().optional(),
      featureCards: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.union([image(), z.string()]),
        imageAlt: z.string(),
        buttonText: z.string(),
        buttonUrl: z.string(),
        reverseLayout: z.boolean().default(false),
      })).optional(),
    }).optional(),
    solutionsSection: z.object({
      'solutions-h3-title': z.string(),
      'solutions-paragraph': z.string().optional(),
      solutionsCards: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.union([image(), z.string()]),
        imageAlt: z.string(),
      })).optional(),
    }).optional(),
  }),
});

// Export collections
export const collections = {
  products: products,
  portfolio: portfolio,
  pages: pages,
};
