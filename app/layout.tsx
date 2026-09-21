import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd, { organizationSchema } from '@/components/JsonLd';
import { Inter, Playfair_Display } from 'next/font/google';
import '../src/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  metadataBase: new URL('https://omayurveda.in'),
  title: 'Om Ayurveda - Authentic Ayurvedic Products & Panchakarma Treatments Since 1958',
  description: 'Authentic Ayurvedic products, clinical formularies, and Panchakarma treatments for modern wellness.',
  openGraph: {
    title: 'Om Ayurveda - Authentic Ayurvedic Products',
    description: 'Authentic Ayurvedic products and Panchakarma treatments Since 1958.',
    url: 'https://omayurveda.in',
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
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen bg-brand-cream font-sans">
        {/* Google Analytics (GA4) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <JsonLd schema={organizationSchema} />
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

