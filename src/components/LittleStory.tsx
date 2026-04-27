"use client";

import React from 'react';
import { Sparkles, Heart, History } from 'lucide-react';

const LittleStory = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-forest relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full -ml-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -mr-32 -mb-32 blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Our Little Story</span>
          </div>

          <h2 className="text-brand-cream font-serif text-3xl md:text-6xl mb-8 leading-tight">
            Healing Hearts Since <span className="text-brand-gold">1958</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 text-left items-center">
            <div className="space-y-6">
              <p className="text-brand-cream/80 text-lg md:text-xl leading-relaxed italic">
                "What started as a small humble clinic in 1958 has grown into a legacy of trust that spans generations and continents."
              </p>
              <div className="flex items-center gap-4 text-brand-gold">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg leading-none">65+ Years</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Of Clinical Excellence</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-brand-gold/10 relative">
              <Heart className="absolute -top-4 -right-4 w-12 h-12 text-brand-gold fill-brand-gold opacity-20" />
              <p className="text-brand-cream/70 text-sm md:text-base leading-relaxed mb-6">
                Healing and treating since 1958, Om Ayurveda has successfully treated millions of people from the root. People from across the country and abroad come here for treatment and leave satisfied.
              </p>
              <p className="text-brand-gold font-serif text-xl italic">
                — Rooted in Tradition, Driven by Results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LittleStory;
