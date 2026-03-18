"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info } from 'lucide-react';

const categories = ["All", "Wellness", "Performance", "Pain Relief", "Sexual Health"];

const products = [
  {
    id: 1,
    name: "Swarna Bhasma Capsules",
    category: "Performance",
    price: "₹2,499",
    description: "Pure 24K gold bhasma for ultimate strength and vitality.",
    image: "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Joint Relief Oil",
    category: "Pain Relief",
    price: "₹899",
    description: "Deep penetrating herbal oil for chronic joint and muscle pain.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Stamina Booster",
    category: "Performance",
    price: "₹1,299",
    description: "Ashwagandha and Shilajit blend for peak physical performance.",
    image: "https://images.unsplash.com/photo-1584017945516-60a7d46273b4?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "Immunity Kadha",
    category: "Wellness",
    price: "₹450",
    description: "Traditional herbal decoction for strong natural defenses.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    name: "Men's Wellness Kit",
    category: "Sexual Health",
    price: "₹3,999",
    description: "Complete Ayurvedic regimen for male reproductive health.",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    name: "Herbal Detox Pack",
    category: "Wellness",
    price: "₹1,599",
    description: "30-day internal cleansing and rejuvenation program.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
  }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-brand-forest relative">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">Our Apothecary</h2>
          <h3 className="text-brand-cream font-serif text-4xl md:text-5xl mb-6">Premium Ayurvedic Products</h3>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-10" />
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                  activeCategory === cat 
                    ? "bg-brand-gold text-brand-black border-brand-gold" 
                    : "bg-transparent text-brand-cream border-brand-cream/30 hover:border-brand-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-brand-cream/5 rounded-3xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold transition-all duration-500">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-brand-gold text-brand-black font-bold px-3 py-1 rounded-full text-sm">
                  {product.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-brand-cream font-serif text-2xl font-bold">{product.name}</h4>
                  <span className="text-brand-gold font-bold text-xl">{product.price}</span>
                </div>
                <p className="text-brand-cream/70 mb-8 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex gap-3">
                  <Button className="flex-1 bg-brand-gold hover:bg-brand-goldDark text-brand-black font-bold">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Enquire Now
                  </Button>
                  <Button variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10">
                    <Info className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;