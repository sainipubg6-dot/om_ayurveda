"use client";

import React, { useEffect } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { TiltedCard } from '@/components/react-bits/TiltedCard';
import { FadedContent } from '@/components/react-bits/FadedContent';
import { Trophy, Activity, ShieldPlus, HeartPulse, Sparkles, Zap, CheckCircle2, ShieldCheck, Award, BadgeCheck } from 'lucide-react';
import { useWCProducts } from '@/hooks/useWCProducts';



const Index = () => {
  const { products: wcProducts } = useWCProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-black">
      <Seo title="Home - Ayurveda Veda" description="Premium Ayurvedic products for wellness, immunity, and holistic health." />
      <Navbar />

      <main>
        {/* Hero */}
        <Hero />
        <Marquee />


        <FadedContent>
          <section className="py-10 md:py-16 bg-brand-gold/5 border-t border-b border-brand-gold/20">
            <div className="container px-4 md:px-6 text-center">
              <h2 className="text-brand-forest font-serif text-xs md:text-sm uppercase tracking-[0.3em] mb-3">Certifications & Labels</h2>
              <h3 className="text-brand-forest font-serif text-3xl md:text-4xl font-bold mb-8">Trusted Quality Assurance</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3 max-w-4xl mx-auto">
                {[
                  { label: 'FSSAI', icon: ShieldCheck },
                  { label: 'ISO', icon: BadgeCheck },
                  { label: 'GMP', icon: Award },
                  { label: 'WHO', icon: CheckCircle2 },
                  { label: '100% NATURAL', icon: CheckCircle2 },
                  { label: 'MAKE IN INDIA', icon: Trophy },
                  { label: 'AYUSH', icon: ShieldPlus },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.label} className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-brand-forest/20 bg-white/90 p-2 md:p-3 text-center shadow-inner">
                      <Icon className="text-brand-gold w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-brand-forest text-[10px] md:text-xs font-semibold tracking-wide leading-tight">{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </FadedContent>

        <FadedContent>
          <div className="py-1 md:py-4">
            <WhyChooseUs />
          </div>
        </FadedContent>
        <FadedContent>
          <div className="py-1 md:py-4">
            <Process />
          </div>
        </FadedContent>
        
        {/* About Preview */}
        <FadedContent>
          <section className="py-10 md:py-24 bg-white relative overflow-hidden">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-16">
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
                  <h2 className="text-brand-gold font-serif text-xs md:text-lg uppercase tracking-[0.3em] mb-2 md:mb-4">Our Legacy</h2>
                  <h3 className="text-brand-forest font-serif text-2xl md:text-5xl mb-4 md:mb-8 leading-tight">Tradition Meets Science</h3>
                  <p className="text-brand-black/70 text-sm md:text-lg mb-3 md:mb-4 leading-relaxed">
                    Om Ayurvedam was established in 1958, and today has successfully treated millions of people from the root.
                  </p>
                  <p className="text-brand-black/90 text-sm md:text-lg mb-4 md:mb-8 leading-relaxed font-hindi italic">
                    ओम आयुर्वेदम की शुरुआत सन 1958 में हुई थी।
                  </p>
                  <div className="space-y-2 md:space-y-4 mb-6 md:mb-10">
                    {[
                      "Registered & Certified Ayurvedic Brand",
                      "100% Natural & Pure Ingredients",
                      "Personalized Treatment Protocols",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 md:gap-3">
                        <CheckCircle2 className="text-brand-gold w-4 h-4 md:w-6 md:h-6 flex-shrink-0" />
                        <span className="text-brand-forest font-medium text-sm md:text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold px-8 py-3 md:px-10 md:py-6 rounded-full text-sm md:text-base h-auto">
                      Learn More About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </FadedContent>


        <FadedContent>
          <Team />
        </FadedContent>

        {/* Products Preview */}
        <FadedContent>
          <div className="bg-brand-forest py-10 md:py-24">
            <div className="container px-4 md:px-6 text-center">
              <h2 className="text-brand-gold font-serif text-xs md:text-lg uppercase tracking-[0.3em] mb-2 md:mb-4">Our Apothecary</h2>
              <h3 className="text-brand-cream font-serif text-2xl md:text-5xl mb-6 md:mb-12 leading-tight">Premium Ayurvedic Formulations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16 text-brand-black">
                {wcProducts.slice(0, 6).map((p, i) => (
                  <Link key={i} to={`/product/${p.id}`} className="block group">
                    <div className="bg-brand-cream/50 backdrop-blur-sm rounded-2xl md:rounded-3xl overflow-hidden border border-brand-gold/20 p-4 md:p-6 text-left hover:border-brand-gold transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 shadow-xl">
                      <div className="relative h-32 md:h-48 overflow-hidden rounded-xl md:rounded-2xl mb-3 md:mb-4">
                        <img src={p.images?.[0]?.src || "/placeholder.svg"} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <h4 className="text-brand-forest font-serif text-sm md:text-xl font-bold line-clamp-1 mb-1">{p.name}</h4>
                      <p className="text-brand-gold font-bold text-sm md:text-base">₹{p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/products">
                <Button size="lg" className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold px-8 py-3 md:px-10 md:py-6 rounded-full text-sm md:text-base h-auto">
                  View Full Apothecary
                </Button>
              </Link>
            </div>
          </div>
        </FadedContent>

        <FadedContent>
          <Testimonials />
        </FadedContent>
        <FadedContent>
          <FAQ />
        </FadedContent>
        {/* Newsletter section removed as email signup is not required */}

        {/* Contact CTA */}
        <FadedContent>
          <div className="py-12 md:py-24 bg-brand-cream text-center">
            <div className="container px-4 md:px-6">
              <h2 className="text-brand-gold font-serif text-xs md:text-lg uppercase tracking-[0.3em] mb-2 md:mb-4">Get In Touch</h2>
              <h3 className="text-brand-forest font-serif text-2xl md:text-5xl mb-6 md:mb-12 leading-tight">Start Your Healing Journey</h3>
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-brand-forest text-brand-gold hover:bg-brand-forest/90 font-bold px-8 py-3 md:px-10 md:py-6 rounded-full text-sm md:text-base h-auto">
                  Contact & Consultations
                </Button>
              </Link>
            </div>
          </div>
        </FadedContent>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;