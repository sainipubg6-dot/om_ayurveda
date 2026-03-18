"use client";

import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Kumar",
    city: "New Delhi",
    rating: 5,
    text: "Om Ayurveda's Swarna Bhasma has completely changed my athletic performance. My recovery time is half of what it used to be. अद्भुत परिणाम!",
    hindi: "ओम आयुर्वेद की स्वर्ण भस्म ने मेरे एथलेटिक प्रदर्शन को पूरी तरह से बदल दिया है।"
  },
  {
    name: "Sunita Sharma",
    city: "Chandigarh",
    rating: 5,
    text: "I suffered from chronic knee pain for 5 years. After 3 months of treatment here, I can walk without support. जोड़ों के दर्द से मुक्ति मिली।",
    hindi: "मैं 5 साल से घुटनों के पुराने दर्द से पीड़ित थी। यहाँ इलाज के बाद अब मैं बिना सहारे के चल सकती हूँ।"
  },
  {
    name: "Amit Patel",
    city: "Ahmedabad",
    rating: 5,
    text: "The personalized care and authentic medicines are what set them apart. Highly recommended for chronic wellness issues.",
    hindi: "व्यक्तिगत देखभाल और प्रामाणिक दवाएं ही उन्हें अलग बनाती हैं।"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-brand-cream overflow-hidden">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">Patient Stories</h2>
          <h3 className="text-brand-forest font-serif text-4xl md:text-5xl">Trusted by Thousands</h3>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-[400px] md:h-[300px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-1000 flex flex-col items-center text-center ${
                  i === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 pointer-events-none"
                }`}
              >
                <Quote className="text-brand-gold w-16 h-16 mb-8 opacity-20" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, star) => (
                    <Star key={star} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                
                <p className="text-brand-forest font-hindi text-2xl md:text-3xl mb-4 italic">
                  "{t.hindi}"
                </p>
                <p className="text-brand-black/70 text-lg mb-8 max-w-2xl">
                  {t.text}
                </p>
                
                <div>
                  <h4 className="text-brand-forest font-bold text-xl">{t.name}</h4>
                  <p className="text-brand-goldDark font-medium">{t.city}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === activeIndex ? "bg-brand-gold w-8" : "bg-brand-gold/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;