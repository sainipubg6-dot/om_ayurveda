"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Team from '@/components/Team';
import Products from '@/components/Products';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
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
            <Button size="lg" className="bg-brand-forest text-brand-gold hover:bg-forest/90 font-bold px-10 py-6 rounded-full">
              View All Specialties
            </Button>
          </Link>
        </div>

        <WhyChooseUs />
        <Process />

        {/* About Preview */}
        <About />
        <div className="bg-white pb-24 text-center">
          <Link to="/about">
            <Button size="lg" variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold px-10 py-6 rounded-full">
              Learn More About Us
            </Button>
          </Link>
        </div>

        <Gallery />
        <Team />
        <Products />
        <Testimonials />
        <Blog />
        <FAQ />
        <Newsletter />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
      <MadeWithDyad />
    </div>
  );
};

export default Index;