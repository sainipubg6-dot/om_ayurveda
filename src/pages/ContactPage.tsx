"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { MadeWithDyad } from "@/components/made-with-dyad";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-black">
      <Navbar />
      <main className="pt-20">
        <div className="bg-brand-forest py-20 text-center">
          <h1 className="text-brand-gold font-serif text-5xl md:text-6xl mb-4">Contact Us</h1>
          <p className="text-brand-cream/80 text-xl max-w-2xl mx-auto">We are here to guide you on your journey to holistic wellness.</p>
        </div>
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <MadeWithDyad />
    </div>
  );
};

export default ContactPage;