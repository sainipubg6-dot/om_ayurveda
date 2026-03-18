"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="container px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-brand-cream">
              <img 
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800" 
                alt="Ayurvedic Consultation"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-leaf/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-brand-forest p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-brand-gold font-serif text-4xl font-bold mb-1">25+</p>
              <p className="text-brand-cream text-sm uppercase tracking-widest">Years of Legacy</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">Our Legacy</h2>
            <h3 className="text-brand-forest font-serif text-4xl md:text-5xl mb-8">Om Ayurveda: Where Tradition Meets Science</h3>
            
            <p className="text-brand-black/70 text-lg mb-8 leading-relaxed">
              Founded on the principles of purity and efficacy, Om Ayurveda is a registered brand dedicated to restoring health through authentic Vedic wisdom. We specialize in high-potency treatments that have been trusted by generations.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Registered & Certified Ayurvedic Brand",
                "100% Natural & Pure Ingredients",
                "Personalized Treatment Protocols",
                "Expert Doctors with Decades of Experience",
                "Specialized Care for Athletes & Chronic Pain"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-gold w-6 h-6 flex-shrink-0" />
                  <span className="text-brand-forest font-medium text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-brand-cream rounded-2xl border-l-4 border-brand-gold">
              <p className="text-brand-forest font-hindi text-xl italic">
                "हमारा लक्ष्य केवल बीमारी का इलाज करना नहीं, बल्कि पूर्ण स्वास्थ्य प्रदान करना है।"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;