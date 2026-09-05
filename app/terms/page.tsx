import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Om Ayurveda',
  description: 'Terms and conditions for Om Ayurveda.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-16">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg text-brand-black/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Introduction</h2>
          <p>Welcome to Om Ayurveda. By accessing our website, you agree to these terms and conditions.</p>
          
          <h2>2. Medical Disclaimer</h2>
          <p>The information provided on this website is for educational purposes only and is not intended to substitute professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
          
          <h2>3. Products and Services</h2>
          <p>All products and services are subject to availability. We reserve the right to discontinue any product at any time.</p>
        </div>
      </div>
    </div>
  );
}
