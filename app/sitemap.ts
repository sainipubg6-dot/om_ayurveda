import { MetadataRoute } from 'next';
import { getWCProductsServer } from '@/lib/woocommerce-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://omayurveda.in';

  // Fetch all products dynamically
  const products = await getWCProductsServer();

  // Create product routes for the sitemap
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug || product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Static routes
  const staticRoutes = [
    '',
    '/products',
    '/services',
    '/checkout',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...staticRoutes, ...productUrls];
}
