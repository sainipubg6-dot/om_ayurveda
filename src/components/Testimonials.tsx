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
    }, 7000); // keep each testimonial visible at least 7 seconds for readability
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-16 bg-brand-cream overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-brand-gold font-serif text-[10px] md:text-sm uppercase tracking-[0.3em] mb-1 font-bold">Patient Stories</h2>
          <h3 className="text-brand-forest font-serif text-2xl md:text-4xl leading-tight">Trusted by Thousands</h3>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="min-h-[280px] sm:min-h-[340px] md:min-h-[360px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-700 flex flex-col items-center text-center px-4 py-6 sm:px-6 sm:py-8 ${
                  i === activeIndex ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                <Quote className="text-brand-gold w-6 h-6 md:w-10 md:h-10 mb-2 md:mb-4 opacity-20" />
                
                <div className="flex gap-1 mb-2 md:mb-4">
                  {[...Array(t.rating)].map((_, star) => (
                    <Star key={star} className="w-3 h-3 md:w-4 md:h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                
                <p className="text-brand-forest font-hindi text-base md:text-2xl mb-1 md:mb-3 italic break-words leading-tight">
                  "{t.hindi}"
                </p>
                <p className="text-brand-black/70 text-[10px] md:text-base mb-2 md:mb-4 max-w-2xl break-words leading-relaxed">
                  {t.text}
                </p>
                
                <div>
                  <h4 className="text-brand-forest font-bold text-sm md:text-xl">{t.name}</h4>
                  <p className="text-brand-goldDark font-medium text-xs md:text-base">{t.city}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 md:h-3 rounded-full transition-all ${
                  i === activeIndex ? "bg-brand-gold w-6 md:w-8" : "bg-brand-gold/30 w-2 md:w-3"
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