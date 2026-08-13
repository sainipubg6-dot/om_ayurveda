"use client";

import React from 'react';
import { History, Award, Users, Globe } from 'lucide-react';

const events = [
  {
    year: "1958",
    title: "The Foundation",
    description: "Om Ayurveda was founded with a mission to preserve and practice pure Vedic healing.",
    icon: History
  },
  {
    year: "1985",
    title: "Technological Integration",
    description: "Expanded our clinical facilities while maintaining traditional formulation methods.",
    icon: Award
  },
  {
    year: "2005",
    title: "Heritage Recognition",
    description: "Became a registered brand trusted by millions across India and abroad.",
    icon: Users
  },
  {
    year: "Today",
    title: "Global Reach",
    description: "Successfully treated over a million patients worldwide through online and offline consultations.",
    icon: Globe
  }
];

const AboutStory = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-6">
        <div className="text-center mb-20">
          <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4 text-center">Our Journey</h2>
          <h3 className="text-brand-forest font-serif text-4xl md:text-5xl mb-6">A Legacy Since 1958</h3>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-gold/20 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {events.map((event, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start'}`}>
                    <span className="text-brand-gold font-serif text-4xl font-bold mb-2">{event.year}</span>
                    <h4 className="text-brand-forest font-serif text-2xl font-bold mb-4">{event.title}</h4>
                    <p className="text-brand-black/60 leading-relaxed max-w-sm">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Dot/Icon */}
                <div className="relative z-10 w-16 h-16 bg-brand-forest rounded-2xl flex items-center justify-center border-4 border-white shadow-xl group-hover:scale-110 transition-transform">
                  <event.icon className="text-brand-gold w-8 h-8" />
                </div>

                {/* Spacer for reverse flex */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;