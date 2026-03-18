"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-black">
      <Navbar />
      
      <main>
        <Hero />
        <Marquee />
        
        {/* Services Preview */}
        <Services />
        <div className="bg-brand-cream pb-24 text-center">
          <Link to="/services">
            <Button size="lg" className="bg-brand-forest text-brand-gold hover:bg-brand-forest/90 font-bold px-10 py-6 rounded-full">
              View All Specialties
            </Button>
          </Link>
        </div>

        {/* About Preview */}
        <About />
        <div className="bg-white pb-24 text-center">
          <Link to="/about">
            <Button size="lg" variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold px-10 py-6 rounded-full">
              Learn More About Us
            </Button>
          </Link>
        </div>

        <Testimonials />

        {/* CTA Section */}
        <section className="py-24 bg-brand-forest text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent" />
          </div>
          <div className="container px-6 relative z-10">
            <h2 className="text-brand-gold font-serif text-4xl md:text-5xl mb-8">Ready to Start Your Healing Journey?</h2>
            <p className="text-brand-cream/80 text-xl max-w-2xl mx-auto mb-12">Book a consultation with our expert doctors today and experience the power of authentic Ayurveda.</p>
            <Link to="/contact">
              <Button size="lg" className="bg-brand-gold text-brand-black hover:bg-brand-goldDark font-bold px-12 py-8 text-xl rounded-full shadow-2xl">
                Book Your Appointment
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MadeWithDyad />
    </div>
  );
};

export default Index;