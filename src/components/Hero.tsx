import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Leaf, UserCheck, Award } from 'lucide-react';
import DotPattern from './react-bits/DotPattern';
import BlurText from './react-bits/BlurText';
import Magnetic from './react-bits/Magnetic';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-forest pt-16 md:pt-20">
      {/* Background Pattern */}
      <DotPattern
        className="fill-brand-gold/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
        width={32}
        height={32}
        cr={1}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-brand-leaf/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 text-center">
        <div className="inline-block px-3 py-1 mb-4 md:mb-6 border border-brand-gold/30 rounded-full bg-brand-gold/5 backdrop-blur-sm">
          <span className="text-brand-gold text-[10px] md:text-sm font-medium tracking-widest uppercase">Ancient Wisdom • Modern Healing</span>
        </div>
        
        <div className="flex flex-wrap justify-center mb-3 md:mb-6 gap-x-2">
          <BlurText
            text="पहला सुख"
            className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-brand-cream leading-tight"
            delay={150}
            animateBy="words"
            direction="top"
          />
          <BlurText
            text="निरोगी काया"
            className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-brand-gold italic leading-tight"
            delay={150}
            animateBy="words"
            direction="bottom"
          />
        </div>
        
        <p className="text-brand-cream/80 text-sm md:text-base lg:text-xl max-w-2xl mx-auto mb-6 md:mb-10 font-sans leading-relaxed px-2">
          Experience the pinnacle of Ayurvedic excellence. Traditional Swarna Bhasma treatments with modern holistic care.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-16">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-gradient-to-r from-brand-gold to-brand-goldDark text-brand-black font-bold text-sm md:text-base px-6 md:px-10 py-3 md:py-7 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(201,168,76,0.3)] h-auto"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Treatments
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold text-sm md:text-base px-6 md:px-10 py-3 md:py-7 rounded-full h-auto"
            onClick={() => window.location.href = 'tel:7015001978'}
          >
            Call Now
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-4 gap-3 md:gap-8 max-w-4xl mx-auto pt-6 md:pt-10 border-t border-brand-cream/10">
          {[
            { icon: ShieldCheck, label: "Registered" },
            { icon: Leaf, label: "100% Ayurvedic" },
            { icon: UserCheck, label: "Expert Doctors" },
            { icon: Award, label: "Trusted" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 md:gap-2">
              <Icon className="text-brand-gold w-5 h-5 md:w-8 md:h-8" />
              <span className="text-brand-cream/70 text-[9px] md:text-sm font-medium leading-tight text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;