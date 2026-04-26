"use client";

import React from 'react';

const images = [
  {
    url: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800",
    title: "Authentic Consultation"
  },
  {
    url: "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800",
    title: "Premium Formulations"
  },
  {
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    title: "Herbal Wisdom"
  },
  {
    url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
    title: "Natural Healing"
  },
  {
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    title: "Detox Therapies"
  },
  {
    url: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800",
    title: "Wellness Kits"
  }
];

const Gallery = () => {
  return (
    <section className="py-10 md:py-24 bg-brand-cream">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
          <h2 className="text-brand-gold font-serif text-xs md:text-lg uppercase tracking-[0.3em] mb-2 md:mb-4">Visual Journey</h2>
          <h3 className="text-brand-forest font-serif text-2xl md:text-5xl mb-3 md:mb-6 leading-tight">Inside Om Ayurveda</h3>
          <div className="w-16 h-0.5 md:w-24 md:h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {images.map((img, index) => (
            <div key={index} className="group relative h-48 md:h-80 rounded-xl md:rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-8">
                <h4 className="text-brand-cream font-serif text-sm md:text-2xl font-bold">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;