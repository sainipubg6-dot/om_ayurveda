import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Om Ayurveda',
  description: 'Privacy policy for Om Ayurveda.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-16">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-brand-black/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to process your orders, provide customer support, and send you important updates about our services.</p>
          
          <h2>3. Data Security</h2>
          <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
        </div>
      </div>
    </div>
  );
}
