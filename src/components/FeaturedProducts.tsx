"use client";

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWCProducts } from '@/lib/woocommerce';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const FeaturedProducts = () => {
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

  // Pick top 8 products for homepage slider
  const featured = products?.slice(0, 8) || [];

  if (loading && products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-forest/5 rounded-full -ml-48 -mb-48 blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-brand-gold font-serif text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 font-bold">Apothecary</h2>
            <h3 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold leading-tight">Top Sellers</h3>
            <p className="text-brand-black/60 text-sm md:text-lg mt-4 max-w-xl">
              Swipe to explore our premium clinical formulations and precious Bhasmas.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex gap-2 mr-4">
                <Button 
                  onClick={() => scroll('left')}
                  variant="outline" 
                  className="w-12 h-12 rounded-full border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-gold"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => scroll('right')}
                  variant="outline" 
                  className="w-12 h-12 rounded-full border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-gold"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
             </div>
             <Link to="/products">
                <Button variant="outline" className="border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-gold font-bold px-8 py-6 rounded-full group">
                  All Products
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
             </Link>
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featured.map((product) => (
            <div key={product.id} className="min-w-[200px] md:min-w-[320px] snap-start group flex flex-col">
              <Link to={`/product/${product.slug || product.id}`} className="flex-1">
                <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-6 shadow-xl border border-brand-gold/5 hover:border-brand-gold/30 transition-all duration-700 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
                  <div className="relative aspect-square rounded-xl md:rounded-[2rem] overflow-hidden mb-4 md:mb-6 bg-brand-cream/10">
                    <img 
                      src={product.images?.[0]?.src || "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"} 
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
                    <span className="text-brand-goldDark font-bold text-base md:text-xl">₹{product.price}</span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                        toast.success(`${product.name} added to cart`);
                      }}
                      className="w-8 h-8 md:w-12 md:h-12 bg-brand-forest text-brand-gold rounded-lg md:rounded-xl flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-500 shadow-lg active:scale-90"
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

export default FeaturedProducts;
