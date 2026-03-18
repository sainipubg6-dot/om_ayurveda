"use client";

import React from 'react';
import { Trophy, Activity, HeartPulse, Sparkles, Zap, ShieldPlus } from 'lucide-react';

const services = [
  {
    title: "Athletes & Performance",
    hindiTitle: "एथलीट और प्रदर्शन",
    description: "Premium Swarna Bhasma formulations for elite strength, stamina, and rapid recovery.",
    icon: Trophy,
    color: "from-brand-gold/20 to-transparent"
  },
  {
    title: "Joint Pain Relief",
    hindiTitle: "जोड़ों का दर्द",
    description: "Specialized treatments for arthritis, chronic joint pain, and bone health.",
    icon: Activity,
    color: "from-brand-leaf/20 to-transparent"
  },
  {
    title: "Chronic Disease",
    hindiTitle: "पुरानी बीमारियाँ",
    description: "Holistic management of long-term health issues through personalized Ayurvedic protocols.",
    icon: ShieldPlus,
    color: "from-brand-forest/20 to-transparent"
  },
  {
    title: "Sexual Wellness",
    hindiTitle: "यौन स्वास्थ्य",
    description: "Discreet and effective Ayurvedic solutions for vitality and reproductive health.",
    icon: HeartPulse,
    color: "from-brand-gold/20 to-transparent"
  },
  {
    title: "Herbal Detox",
    hindiTitle: "हर्बल डिटॉक्स",
    description: "Panchakarma-inspired body purification to remove toxins and restore balance.",
    icon: Sparkles,
    color: "from-brand-leaf/20 to-transparent"
  },
  {
    title: "Immunity Boost",
    hindiTitle: "रोग प्रतिरोधक क्षमता",
    description: "Strengthen your natural defenses with potent herbal extracts and minerals.",
    icon: Zap,
    color: "from-brand-forest/20 to-transparent"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-brand-cream relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">Our Specialties</h2>
          <h3 className="text-brand-forest font-serif text-4xl md:text-5xl mb-6">Expert Ayurvedic Care</h3>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-brand-gold/20 hover:border-brand-gold transition-all duration-500 hover:-translate-y-2 shadow-xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-forest rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="text-brand-gold w-8 h-8" />
                </div>
                
                <h4 className="text-brand-gold font-hindi text-2xl mb-1">{service.hindiTitle}</h4>
                <h5 className="text-brand-forest font-serif text-xl font-bold mb-4">{service.title}</h5>
                <p className="text-brand-black/70 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <a href="#contact" className="inline-flex items-center text-brand-goldDark font-bold hover:gap-2 transition-all">
                  Learn More <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;