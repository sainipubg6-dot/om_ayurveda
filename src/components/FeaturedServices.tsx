"use client";

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const v = "?v=" + Date.now();

const allFeaturedServices = [
  {
    name: "Shirodhara",
    hindi: "शिरोधारा",
    price: "₹1,800",
    duration: "45–60 min",
    image: "/images/services/Shirodhara.png" + v,
    tag: "Best Seller"
  },
  {
    name: "Cupping Therapy",
    hindi: "कपिंग थेरेपी",
    price: "₹500",
    duration: "30–40 min",
    image: "/images/services/Cupping Therapy.png" + v,
    tag: "Instant Relief"
  },
  {
    name: "Pottli Sweda",
    hindi: "पोटली स्वेदा",
    price: "₹1,500",
    duration: "45–60 min",
    image: "/images/services/pottli and patra combo.png" + v,
    tag: "Joint Care"
  },
  {
    name: "Netra Vasti",
    hindi: "नेत्र वस्ती",
    price: "₹1,200",
    duration: "30–40 min",
    image: "/images/services/netra vasti .png" + v,
    tag: "Eye Care"
  },
  {
    name: "Kati Vasti",
    hindi: "कटी वस्ती",
    price: "₹1,200",
    duration: "45 min",
    image: "/images/services/kati vasti.png" + v,
    tag: "Back Pain"
  },
  {
    name: "Full Body Treatment",
    hindi: "पूर्ण शरीर उपचार",
    price: "₹4,900",
    duration: "3–4 hrs",
    image: "/images/services/full body  treatmen .png" + v,
    tag: "Ultimate Detox"
  }
];

const FeaturedServices = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-brand-gold font-serif text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 font-bold">Elite Treatments</h2>
            <h3 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold leading-tight">Healing Services</h3>
            <p className="text-brand-black/60 text-sm md:text-lg mt-4 max-w-xl">
              Swipe to explore our most sought-after Ayurvedic therapies for deep rejuvenation.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex gap-2 mr-4">
                <Button 
                  onClick={() => scroll('left')}
                  variant="outline" 
                  className="w-12 h-12 rounded-full border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => scroll('right')}
                  variant="outline" 
                  className="w-12 h-12 rounded-full border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
             </div>
             <Link to="/services">
                <Button variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black font-bold px-8 py-6 rounded-full group">
                  All Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
             </Link>
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allFeaturedServices.map((service, index) => (
            <div 
              key={index} 
              className="min-w-[280px] md:min-w-[380px] snap-start group"
            >
              <div className="bg-brand-cream/30 rounded-[2.5rem] overflow-hidden border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-700 shadow-sm hover:shadow-2xl h-full">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-gold text-brand-black px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-brand-black" /> {service.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-brand-gold font-hindi text-sm mb-1">{service.hindi}</p>
                    <h4 className="text-white font-serif text-2xl md:text-3xl font-bold">{service.name}</h4>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-brand-forest/60 text-sm font-medium">
                    <Clock className="w-4 h-4" /> {service.duration}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-brand-goldDark font-bold text-2xl">{service.price}</span>
                    <span className="text-[10px] text-brand-black/30 font-bold uppercase tracking-widest">Starting Price</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
