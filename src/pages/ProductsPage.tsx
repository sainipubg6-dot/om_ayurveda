"use client";

import React, { useState, useEffect } from 'react';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useWCProducts } from '@/lib/woocommerce';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProductsPage = () => {
  const { products, loading } = useWCProducts();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (products?.length > 0) {
      const cats = Array.from(new Set(products.map(p => p.categories?.[0]?.name || 'Uncategorized')));
      setCategories(['All', ...cats]);
    }
  }, [products]);

  const filteredProducts = products?.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || (p.categories?.[0]?.name === selectedCategory);
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Seo title="Apothecary - Ayurveda Veda" description="Premium Ayurvedic formulations, supplements, and wellness products." />
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container px-4 md:px-6">
          {/* Header & Filter Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
            <div className="max-w-2xl">
              <h2 className="text-brand-gold font-serif text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 font-bold">Clinical Formularies</h2>
              <h1 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold">Authentic Ayurvedic Solutions</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-brand-black/40 text-[10px] uppercase font-bold tracking-widest hidden md:block">Filter By:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white border-brand-gold/20 text-brand-forest hover:bg-brand-gold/5 rounded-xl h-12 px-6 flex items-center gap-4 shadow-sm group">
                    <span className="font-bold text-sm">{selectedCategory}</span>
                    <SlidersHorizontal className="w-4 h-4 text-brand-gold group-hover:rotate-180 transition-transform duration-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl border-brand-gold/10 p-2 shadow-2xl bg-white/95 backdrop-blur-xl">
                  {categories.map((cat) => (
                    <DropdownMenuItem 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "cursor-pointer font-medium py-3 px-4 transition-colors rounded-xl",
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

          {/* Search Bar */}
          <div className="relative mb-12 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold w-5 h-5" />
            <Input 
              placeholder="Search formulations (e.g. Swranprash, Omega 3)..."
              className="pl-12 bg-white border-brand-gold/10 h-14 rounded-2xl shadow-lg focus:ring-brand-gold/20 transition-all text-brand-forest font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/50 animate-pulse rounded-[2.5rem] aspect-[3/4]" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <Link to={`/product/${product.slug || product.id}`}>
                    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 shadow-xl border border-brand-gold/5 hover:border-brand-gold/30 transition-all duration-700 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
                      <div className="relative aspect-square md:aspect-[4/5] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-8 bg-brand-cream/10">
                        <img 
                          src={product.images?.[0]?.src || "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"} 
                          alt={product.name} 
                          className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-brand-forest/80 backdrop-blur-md text-brand-gold text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            {product.categories?.[0]?.name || 'Uncategorized'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 px-2">
                        <h3 className="text-brand-forest font-serif text-xl md:text-2xl font-bold mb-2 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                        <p className="text-brand-black/40 text-xs md:text-sm line-clamp-2 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: product.short_description }} />
                      </div>

                      <div className="flex items-center justify-between mt-auto px-2">
                        <div className="flex flex-col">
                          <span className="text-brand-gold font-bold text-xl md:text-2xl">₹{product.price}</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                            toast.success(`${product.name} added to cart`);
                          }}
                          className="w-12 h-12 md:w-14 md:h-14 bg-brand-forest text-brand-gold rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-500 shadow-lg active:scale-90"
                        >
                          <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 md:py-32 bg-white rounded-[3rem] border border-dashed border-brand-gold/30">
              <Search className="w-16 h-16 text-brand-gold/20 mx-auto mb-6" />
              <h2 className="text-brand-forest font-serif text-2xl md:text-3xl font-bold mb-2">No formulations found</h2>
              <p className="text-brand-black/40">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;