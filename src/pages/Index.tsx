"use client";

import React, { useEffect } from 'react';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ExcellenceAndProcess from '@/components/ExcellenceAndProcess';
import Team from '@/components/Team';
import TrustAndResults from '@/components/TrustAndResults';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { FadedContent } from '@/components/react-bits/FadedContent';
import { Trophy, ShieldPlus, CheckCircle2, ShieldCheck, Award, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-black">
      <Seo title="Home - Ayurveda Veda" description="Premium Ayurvedic products for wellness, immunity, and holistic health." />
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Banner */}
        <Hero />
        <Marquee />

        {/* 2. Excellence & Healing Journey (Merged & Tight) */}
        <FadedContent>
          <ExcellenceAndProcess />
        </FadedContent>
        
        {/* 3. Our Legacy Section (Tight Padding) */}
        <FadedContent>
          <section className="py-8 md:py-16 bg-white relative overflow-hidden">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-12">
                <div className="w-full lg:w-1/2 relative">
                  <div className="relative z-10 rounded-xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-8 border-brand-cream">
                    <img
                      src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800"
                      alt="Ayurvedic Consultation"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-brand-forest p-4 md:p-8 rounded-xl md:rounded-2xl shadow-xl hidden sm:block border border-brand-gold/20 z-20">
                    <p className="text-brand-gold font-serif text-2xl md:text-4xl font-bold mb-1">1958</p>
                    <p className="text-brand-cream text-[8px] md:text-[10px] uppercase tracking-widest leading-none">Est. Since</p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h2 className="text-brand-gold font-serif text-[10px] md:text-sm uppercase tracking-[0.3em] mb-2 font-bold">Our Legacy</h2>
                  <h3 className="text-brand-forest font-serif text-2xl md:text-5xl mb-4 md:mb-6 leading-tight font-bold">Tradition Meets Science</h3>
                  <p className="text-brand-black/70 text-sm md:text-lg mb-4 leading-relaxed">
                    Om Ayurvedam was established in 1958, and today has successfully treated millions of people from the root.
                  </p>
                  <div className="space-y-2 md:space-y-4 mb-6 md:mb-8">
                    {[
                      "Registered & Certified Brand",
                      "100% Pure Herbs",
                      "Custom Treatment Protocols",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 md:gap-3">
                        <CheckCircle2 className="text-brand-gold w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        <span className="text-brand-forest font-medium text-sm md:text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold px-8 py-4 rounded-full text-sm md:text-base h-auto">
                      Learn More About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </FadedContent>

        {/* 4. Meet Our Vaidyas (Tight Padding) */}
        <FadedContent>
          <div className="py-4 md:py-8">
            <Team />
          </div>
        </FadedContent>

        {/* 5. Trust & Results (Merged Certifications & Testimonials) */}
        <FadedContent>
          <TrustAndResults />
        </FadedContent>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;