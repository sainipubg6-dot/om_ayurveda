"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Leaf, UserCheck, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-forest pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-leaf/10 rounded-full blur-3xl animate-pulse delay-700" />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-brand-gold/20 rounded-full animate-float"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-6 text-center">
        <div className="inline-block px-4 py-1 mb-6 border border-brand-gold/30 rounded-full bg-brand-gold/5 backdrop-blur-sm">
          <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">Ancient Wisdom • Modern Healing</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-cream mb-6 leading-tight">
          पहला सुख <span className="text-brand-gold italic">निरोगी काया</span>
        </h1>
        
        <p className="text-brand-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans">
          Experience the pinnacle of Ayurvedic excellence. We combine traditional Swarna Bhasma treatments with modern holistic care for athletes and chronic wellness.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-gradient-to-r from-brand-gold to-brand-goldDark text-brand-black font-bold text-lg px-10 py-7 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(201,168,76,0.3)]"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Treatments
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold text-lg px-10 py-7 rounded-full"
            onClick={() => window.location.href = 'tel:7015001978'}
          >
            Call Now
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-10 border-t border-brand-cream/10">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="text-brand-gold w-8 h-8" />
            <span className="text-brand-cream/70 text-sm font-medium">Registered Brand</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Leaf className="text-brand-gold w-8 h-8" />
            <span className="text-brand-cream/70 text-sm font-medium">100% Ayurvedic</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <UserCheck className="text-brand-gold w-8 h-8" />
            <span className="text-brand-cream/70 text-sm font-medium">Expert Doctors</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Award className="text-brand-gold w-8 h-8" />
            <span className="text-brand-cream/70 text-sm font-medium">Trusted by Athletes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;