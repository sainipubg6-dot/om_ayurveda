import { Metadata } from 'next';
import { getWCProductsServer } from '@/lib/woocommerce-server';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Ayurvedic Products | Om Ayurveda',
  description: 'Shop authentic Ayurvedic products from Om Ayurveda — clinical formularies for immunity, digestion, joint care, hair care and more. Since 1958.',
  alternates: {
    canonical: 'https://omayurveda.in/products',
  },
  openGraph: {
    title: 'Ayurvedic Products | Om Ayurveda',
    description: 'Shop authentic Ayurvedic products from Om Ayurveda — clinical formularies for immunity, digestion, joint care, hair care and more. Since 1958.',
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
