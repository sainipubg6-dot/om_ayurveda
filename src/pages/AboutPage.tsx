"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Process from '@/components/Process';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { MadeWithDyad } from "@/components/made-with-dyad";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-black">
      <Navbar />
      <main className="pt-20">
        <div className="bg-brand-forest py-20 text-center">
          <h1 className="text-brand-gold font-serif text-5xl md:text-6xl mb-4">About Om Ayurveda</h1>
          <p className="text-brand-cream/80 text-xl max-w-2xl mx-auto">A legacy of healing and purity spanning over 25 years.</p>
        </div>
        <About />
        <Process />
      </main>
      <Footer />
      <WhatsAppButton />
      <MadeWithDyad />
    </div>
  );
};

export default AboutPage;