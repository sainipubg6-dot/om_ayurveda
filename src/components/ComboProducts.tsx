"use client";

import Link from 'next/link';
import React, { useRef } from 'react';

import { ArrowRight, ShoppingCart, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWCProducts } from '@/lib/woocommerce';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { getSecureImageUrl } from '@/lib/utils';

const ComboProducts = () => {
  const { products, loading } = useWCProducts();
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Filter combo products
  const combos = products?.filter(p => 
    p.categories?.some((c: any) => c.name.toLowerCase().includes('combo'))
  ) || [];

  if (loading || combos.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-forest/5 rounded-full -ml-48 -mb-48 blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="mb-8 md:mb-16">
          <div className="flex flex-row justify-between items-start gap-2 mb-4 md:mb-0">
            <div className="max-w-2xl">
              <h2 className="text-brand-forest/90 font-serif text-[10px] md:text-xs uppercase tracking-[0.3em] mb-1 md:mb-3 font-bold">Value For Money</h2>
              <h3 className="text-brand-forest font-serif text-[28px] xs:text-3xl md:text-5xl font-bold leading-tight">Recommended Combos</h3>
              <p className="text-brand-black/80 text-sm md:text-lg mt-2 md:mt-4 max-w-xl hidden md:block">
                Explore our best value combo packs for comprehensive Ayurvedic wellness.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-1 md:pt-4">
               <div className="hidden md:flex gap-2 mr-2">
                  <Button 
                    onClick={() => scroll('left')}
                    variant="outline" 
                    className="w-12 h-12 rounded-full border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-gold"
                    aria-label="Scroll products left"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={() => scroll('right')}
                    variant="outline" 
                    className="w-12 h-12 rounded-full border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-gold"
                    aria-label="Scroll products right"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
               </div>
               <Link href="/products?category=combo">
                  <Button variant="outline" className="border border-brand-forest text-brand-forest bg-transparent hover:bg-brand-forest hover:text-brand-cream font-bold px-3 py-1 xs:px-4 xs:py-2 md:px-8 md:py-6 h-8 xs:h-10 md:h-14 rounded-full flex items-center group text-[10px] xs:text-xs md:text-base">
                    All Combos
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
               </Link>
            </div>
          </div>
          <p className="text-brand-black/60 text-[13px] sm:text-sm mt-2 max-w-xl md:hidden leading-relaxed">
            Explore our best value combo packs for comprehensive Ayurvedic wellness.
          </p>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {combos.map((product) => (
            <div key={product.id} className="w-[150px] xs:w-[180px] sm:w-[220px] md:w-[320px] flex-shrink-0 snap-start group flex flex-col">
              <Link href={`/product/${product.slug || product.id}`} className="flex-1">
                <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-6 shadow-xl border border-brand-gold/5 hover:border-brand-gold/30 transition-all duration-700 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
                  <div className="relative aspect-square rounded-xl md:rounded-[2rem] overflow-hidden mb-3 md:mb-6 bg-brand-cream/10">
                    <img 
                      src={getSecureImageUrl(product.images?.[0]?.src) || "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"} 
                      alt={product.name} 
                      className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 md:top-4 md:right-4">
                       <div className="bg-brand-forest/90 text-brand-gold p-1.5 md:p-2 rounded-full shadow-lg backdrop-blur-sm">
                          <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                       </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 px-1">
                    <h4 className="text-brand-forest font-serif text-xs md:text-xl font-bold mb-1 group-hover:text-brand-gold transition-colors line-clamp-2 min-h-[2rem] md:min-h-[3.5rem]">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1 mb-3 md:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto px-1">
                    <div className="flex flex-col">
                      {product.on_sale && product.regular_price ? (
                        <>
                          <span className="text-brand-black/30 text-[10px] md:text-xs line-through">₹{product.regular_price}</span>
                          <span className="text-brand-goldDark font-bold text-base md:text-xl">₹{product.price}</span>
                        </>
                      ) : (
                        <span className="text-brand-goldDark font-bold text-base md:text-xl">₹{product.price}</span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                        toast.success(`${product.name} added to cart`);
                      }}
                      className="w-8 h-8 md:w-12 md:h-12 bg-brand-forest text-brand-gold rounded-lg md:rounded-xl flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-500 shadow-lg active:scale-90"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboProducts;