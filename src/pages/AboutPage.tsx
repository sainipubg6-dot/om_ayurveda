"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import AboutStats from '@/components/AboutStats';
import AboutStory from '@/components/AboutStory';
import AboutValues from '@/components/AboutValues';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import Marquee from '@/components/Marquee';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Seo from '@/components/Seo';
import { Facebook, Instagram, Twitter, Youtube, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-black">
      <Seo title="About Us - Ayurveda Veda" description="Learn about our legacy, values, and expert Vaidhyas." />
      <Navbar />
      
      <main className="pt-20">
        {/* Enhanced About Hero */}
        <div className="relative bg-brand-forest py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/60 to-transparent" />
          
          <div className="container px-6 relative z-10 text-center">
            <div className="inline-block px-4 py-1 mb-6 border border-brand-gold/30 rounded-full bg-brand-gold/5 backdrop-blur-sm">
              <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">Est. 1958 • Legacy of Healing</span>
            </div>
            <h1 className="text-brand-gold font-serif text-5xl md:text-7xl lg:text-8xl mb-6">Our Legacy</h1>
            <p className="text-brand-cream/80 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              Founded on the pillars of ancient Vedic science and modern clinical precision, Om Ayurveda has been a beacon of hope for over 65 years.
            </p>
          </div>
        </div>

        <Marquee />
        <About />
        <AboutStats />
        <AboutStory />
        <AboutValues />
        
        <div className="bg-white py-24">
          <div className="container px-6">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">Our Experts</h2>
              <h3 className="text-brand-forest font-serif text-4xl md:text-5xl">Meet Our Vaidhyas</h3>
            </div>
            <Team />
          </div>
        </div>


        {/* Professional Social Connect Banner */}
        <div className="bg-brand-forest py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-10" />
          <div className="container px-6 relative z-10 text-center">
            <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.4em] mb-6">Join Our Community</h2>
            <h3 className="text-brand-cream font-serif text-4xl md:text-6xl mb-12">Healing together, sharing wisdom.</h3>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/om_ayurveda_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', color: 'hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 hover:text-[#E4405F]' },
                { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/share/18GU2kfgpM/?mibextid=wwXIfr', color: 'hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 hover:text-[#1877F2]' },
                { name: 'Youtube', icon: Youtube, href: 'https://youtube.com/@omayurveda786?si=gat_k6lBuZht7mqe', color: 'hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 hover:text-[#FF0000]' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-4 px-8 py-4 rounded-2xl border border-brand-gold/20 bg-white/5 text-brand-gold backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 group shadow-2xl",
                    social.color
                  )}
                >
                  <social.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span className="font-bold text-sm uppercase tracking-widest">{social.name}</span>
                </a>
              ))}
            </div>

            <div className="mt-16 pt-16 border-t border-brand-gold/10">
              <p className="text-brand-cream/40 max-w-2xl mx-auto italic leading-relaxed">
                "Our mission is to bring the authentic healing power of Ayurveda to every home. Connect with us to stay informed about ancient wellness rituals."
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;