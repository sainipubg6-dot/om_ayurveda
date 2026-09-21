import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/checkout', '/api', '/account'],
    },
    sitemap: 'https://omayurveda.in/sitemap.xml',
  };
}
