"use client";

import React from 'react';
import Testimonials from './Testimonials';
import { Trophy, ShieldPlus, CheckCircle2, ShieldCheck, Award, BadgeCheck } from 'lucide-react';

const TrustAndResults = () => {
  return (
    <section className="py-8 md:py-16 bg-white border-t border-b border-brand-gold/10">
      <div className="container px-4 md:px-6">
        {/* Top Part: Certifications */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-brand-gold font-serif text-[10px] md:text-sm uppercase tracking-[0.4em] mb-1 font-bold">Trust & Quality</h2>
          <h3 className="text-brand-forest font-serif text-2xl md:text-4xl font-bold mb-6">Certified Healing Excellence</h3>
          
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3 max-w-4xl mx-auto">
            {[
              { label: 'FSSAI', icon: ShieldCheck },
              { label: 'ISO', icon: BadgeCheck },
              { label: 'GMP', icon: Award },
              { label: 'WHO', icon: CheckCircle2 },
              { label: 'NATURAL', icon: CheckCircle2 },
              { label: 'INDIA', icon: Trophy },
              { label: 'AYUSH', icon: ShieldPlus },
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex flex-col items-center justify-center gap-1 rounded-xl border border-brand-forest/10 bg-brand-cream/10 p-2 md:p-3 text-center shadow-sm">
                  <Icon className="text-brand-gold w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-brand-forest text-[8px] md:text-xs font-bold tracking-wide uppercase">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAndResults;
