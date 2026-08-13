import React from 'react';
import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FestivalProvider from '@/themes/FestivalProvider';
import '../src/globals.css';

export const metadata: Metadata = {
  title: 'Ayurveda Veda - Premium Ayurvedic Solutions',
  description: 'Authentic Ayurvedic products for modern wellness',
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
          <FestivalProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">
              {children}
            </main>
            <Footer />
          </FestivalProvider>
        </Providers>
      </body>
    </html>
  );
}

