import { Metadata } from 'next';
import { getWCProductsServer } from '@/lib/woocommerce-server';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Our Products | Om Ayurveda',
  description: 'Explore our authentic Ayurvedic products, clinical formularies, and wellness solutions.',
  alternates: {
    canonical: 'https://omayurveda.in/products',
  },
  openGraph: {
    title: 'Our Products | Om Ayurveda',
    description: 'Explore our authentic Ayurvedic products, clinical formularies, and wellness solutions.',
    url: 'https://omayurveda.in/products',
  }
};

export default async function ProductsPage() {
  const products = await getWCProductsServer();

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <main className="flex-1 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container px-4 md:px-6">
          <ProductsClient products={products} />
        </div>
      </main>
    </div>
  );
}
