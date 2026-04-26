"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="py-10 md:py-20 bg-brand-forest relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-leaf/10 rounded-full -ml-32 -mb-32 blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-brand-gold/20 rounded-3xl md:rounded-[3rem] p-6 md:p-16 text-center">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-brand-gold rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-8 shadow-lg">
            <Mail className="text-brand-forest w-5 h-5 md:w-8 md:h-8" />
          </div>
          
          <h2 className="text-brand-gold font-serif text-xl md:text-4xl mb-2 md:mb-4 leading-tight">Join Our Wellness Community</h2>
          <p className="text-brand-cream/70 text-sm md:text-lg mb-6 md:mb-10 max-w-2xl mx-auto">
            Subscribe for weekly Ayurvedic tips, seasonal wellness guides, and exclusive offers.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 h-11 md:h-14 rounded-full px-5 md:px-8 focus:border-brand-gold"
            />
            <Button className="bg-brand-gold hover:bg-brand-goldDark text-brand-black font-bold h-11 md:h-14 px-6 md:px-10 rounded-full shadow-xl text-sm md:text-base whitespace-nowrap">
              Subscribe Now
            </Button>
          </form>
          
          <p className="text-brand-cream/30 text-xs mt-4 md:mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;