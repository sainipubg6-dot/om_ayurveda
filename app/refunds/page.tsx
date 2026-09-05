import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | Om Ayurveda',
  description: 'Return and refund policy for Om Ayurveda.',
};

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-16">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold mb-8">Refund & Cancellation Policy</h1>
        <div className="prose prose-lg text-brand-black/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Return Policy</h2>
          <p>Due to the nature of Ayurvedic formulations and health products, we do not accept returns once a product has been opened or used. Unopened products may be returned within 7 days of delivery.</p>
          
          <h2>2. Refunds</h2>
          <p>Once we receive your returned item, we will inspect it and notify you of the status of your refund. If your return is approved, we will initiate a refund to your original method of payment.</p>
          
          <h2>3. Cancellations</h2>
          <p>Orders can be cancelled before they are dispatched. Once an order is dispatched, it cannot be cancelled.</p>
        </div>
      </div>
    </div>
  );
}
