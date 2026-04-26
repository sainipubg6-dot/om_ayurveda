"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Seo from '@/components/Seo';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-black">
      <Seo title="Contact Us - Ayurveda Veda" description="Get in touch with us for consultations and inquiries." />
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="bg-brand-forest py-12 md:py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gold/5 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 border-2 border-brand-gold rounded-full -mr-32 -mt-32" />
          </div>
          <h1 className="text-brand-gold font-serif text-4xl md:text-6xl mb-3 font-bold relative z-10">Contact Us</h1>
          <p className="text-brand-cream/80 text-base md:text-xl max-w-2xl mx-auto relative z-10">We are here to guide you on your journey to holistic wellness.</p>
        </div>
        <Contact />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;