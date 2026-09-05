import React from 'react';
import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../src/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://omayurveda.co.in'),
  title: 'Om Ayurveda - Authentic Ayurvedic Products & Panchakarma Treatments Since 1958',
  description: 'Authentic Ayurvedic products, clinical formularies, and Panchakarma treatments for modern wellness.',
  openGraph: {
    title: 'Om Ayurveda - Authentic Ayurvedic Products',
    description: 'Authentic Ayurvedic products and Panchakarma treatments Since 1958.',
    url: 'https://omayurveda.co.in',
    siteName: 'Om Ayurveda',
    images: [
      {
        url: '/Logo.png',
        width: 800,
        height: 600,
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Ayurveda',
    description: 'Authentic Ayurvedic products and Panchakarma treatments Since 1958.',
    images: ['/Logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-brand-cream font-sans">
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

