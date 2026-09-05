import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Om Ayurveda',
  description: 'Shipping policy and delivery information for Om Ayurveda.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-16">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold mb-8">Shipping Policy</h1>
        <div className="prose prose-lg text-brand-black/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Shipping Times</h2>
          <p>We process all orders within 1-2 business days. Delivery times vary by location, typically taking 3-7 business days for domestic orders.</p>
          
          <h2>2. Shipping Rates</h2>
          <p>Shipping rates are calculated at checkout based on the weight of your order and the delivery destination.</p>
          
          <h2>3. International Shipping</h2>
          <p>We currently ship within India and to the USA. International shipping times may vary based on customs processing.</p>
        </div>
      </div>
    </div>
  );
}
