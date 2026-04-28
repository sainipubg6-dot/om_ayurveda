"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Leaf, UserCheck, Award } from 'lucide-react';
import DotPattern from './react-bits/DotPattern';
import BlurText from './react-bits/BlurText';

const Hero = () => {
  return (
    <section id="home" className="relative pt-2 pb-8 md:pt-6 md:pb-20 flex items-center justify-center overflow-hidden bg-brand-cream">
      {/* Subtle Background Pattern */}
      <DotPattern
        className="fill-brand-forest/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
        width={32}
        height={32}
        cr={1}
      />
      
      {/* Elegant Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-brand-forest/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-[500px] md:h-[500px] bg-brand-gold/10 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 text-center">
        {/* Top Badge */}
        <div className="inline-block px-4 py-1.5 mb-3 md:mb-8 bg-brand-forest rounded-lg shadow-lg">
          <span className="text-brand-cream text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">Ancient Wisdom • Modern Healing</span>
        </div>
        
        {/* Main Headline (Hindi) - ANIMATED */}
        <div className="mb-4 md:mb-10 flex flex-col items-center">
          <BlurText
            text="पहला सुख"
            className="font-hindi text-brand-forest text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[1.1] tracking-tight"
            delay={150}
            animateBy="words"
            direction="top"
          />
          <BlurText
            text="निरोगी काया"
            className="font-hindi italic font-medium text-brand-forest/90 text-4xl sm:text-6xl md:text-7xl lg:text-9xl leading-[1.1]"
            delay={300}
            animateBy="words"
            direction="bottom"
          />
        </div>
        
        {/* Subtitle */}
        <p className="text-brand-forest/70 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto mb-4 md:mb-10 font-medium leading-relaxed px-4">
          Experience Ayurvedic excellence with traditional <span className="text-brand-forest font-bold">Swarna Bhasma</span> treatments and clinical precision since 1958.
        </p>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-2 xs:gap-4 mb-12 md:mb-24 px-4 max-w-xl mx-auto">
          <Button 
            className="flex-1 bg-brand-forest hover:bg-brand-forest/90 text-brand-cream font-bold text-[10px] xs:text-xs sm:text-sm md:text-lg h-12 md:h-16 px-1 xs:px-4 rounded-full shadow-lg transition-all active:scale-95 whitespace-normal sm:whitespace-nowrap leading-tight"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            EXPLORE TREATMENTS
          </Button>
          <Button 
            className="flex-1 bg-brand-forest hover:bg-brand-forest/90 text-brand-cream font-bold text-[10px] xs:text-xs sm:text-sm md:text-lg h-12 md:h-16 px-1 xs:px-4 rounded-full shadow-lg transition-all active:scale-95 whitespace-normal sm:whitespace-nowrap leading-tight"
            onClick={() => window.location.href = 'tel:7015001978'}
          >
            CALL NOW
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-4 gap-4 md:gap-16 items-center">
            {[
              { icon: ShieldCheck, label: "Registered" },
              { icon: Leaf, label: "Ayurvedic" },
              { icon: UserCheck, label: "Expert" },
              { icon: Award, label: "Trusted" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                  <Icon className="text-brand-forest w-6 h-6 md:w-10 md:h-10 transition-colors" />
                </div>
                <span className="text-brand-forest/60 text-[8px] md:text-xs font-bold uppercase tracking-[0.2em]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;