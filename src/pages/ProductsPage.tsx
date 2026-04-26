"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWCProducts } from '@/lib/woocommerce';
import { ShoppingCart, Star, Filter, ArrowRight, Activity, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProductsPage = () => {
  const { products, loading, error } = useWCProducts();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    products.forEach(p => {
      p.categories.forEach(c => cats.add(c.name));
    });
    return Array.from(cats);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter(p => 
      p.categories.some(c => c.name === selectedCategory)
    );
  }, [products, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Seo title="Apothecary - Ayurveda Veda" description="Premium Ayurvedic formulations prepared with authentic Shastric methods." />
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Banner Section */}
        <section className="bg-brand-forest py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold rounded-full blur-3xl -mr-32 -mt-32" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10 text-center">
            <h1 className="text-brand-gold font-serif text-3xl md:text-5xl lg:text-7xl mb-4 md:mb-6 font-bold">Our Apothecary</h1>
            <p className="text-brand-cream/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Premium Ayurvedic formulations prepared with authentic Shastric methods for holistic healing and clinical precision.
            </p>
          </div>
        </section>

        {/* Filter & Products Section */}
        <section className="py-8 md:py-16 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 md:mb-12">
              <div className="text-center md:text-left">
                <p className="text-brand-gold font-serif text-[10px] md:text-xs uppercase tracking-[0.4em] mb-1 font-bold">Clinical Formularies</p>
                <h2 className="text-brand-forest font-serif text-2xl md:text-4xl font-bold">Authentic Ayurvedic Solutions</h2>
              </div>

              {/* Premium Category Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-brand-forest/60 text-xs font-bold uppercase tracking-widest hidden sm:block">Filter by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white border-brand-gold/30 text-brand-forest min-w-[180px] h-12 rounded-xl flex justify-between items-center shadow-lg hover:bg-brand-cream group transition-all">
                      <span className="font-bold">{selectedCategory}</span>
                      <Filter className="w-4 h-4 ml-2 text-brand-gold group-hover:rotate-12 transition-transform" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-brand-gold/20 rounded-xl shadow-2xl min-w-[180px]">
                    {categories.map((cat) => (
                      <DropdownMenuItem 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "cursor-pointer font-medium py-3 px-4 transition-colors",
                          selectedCategory === cat ? "bg-brand-forest text-brand-gold" : "hover:bg-brand-cream text-brand-forest"
                        )}
                      >
                        {cat}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="w-12 h-12 text-brand-gold animate-spin mb-4" />
                <p className="text-brand-forest font-bold tracking-widest uppercase text-xs">Fetching Formulations...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-red-50 rounded-[2rem] border border-red-100 max-w-xl mx-auto">
                <Activity className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-red-800 font-bold mb-2">Service Temporarily Offline</h3>
                <p className="text-red-600 text-sm">Please try again in a few minutes or contact support.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-brand-gold/5 group flex flex-col h-full">
                      <div className="relative overflow-hidden aspect-[4/5]">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-brand-forest/90 backdrop-blur-sm text-brand-gold text-[9px] md:text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                            {product.categories[0]?.name || 'Premium'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <h3 className="text-brand-forest font-serif text-lg md:text-xl font-bold mb-2 leading-tight group-hover:text-brand-gold transition-colors truncate">
                          {product.name}
                        </h3>
                        <p className="text-brand-black/60 text-xs md:text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                          {product.description.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-brand-gold/5">
                          <div>
                            <span className="text-brand-gold font-bold text-lg md:text-xl">₹{product.price}</span>
                          </div>
                          <Button 
                            onClick={() => {
                              addToCart(product);
                              showSuccess(`${product.name} added to cart`);
                            }}
                            className="bg-brand-forest text-brand-gold hover:bg-brand-gold hover:text-brand-black h-10 w-10 md:h-12 md:w-12 rounded-xl p-0 transition-all active:scale-90"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-20 bg-brand-gold/5 rounded-[2rem] border border-brand-gold/10">
                    <p className="text-brand-forest font-bold opacity-40 uppercase tracking-widest text-xs">No products found in this category</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;