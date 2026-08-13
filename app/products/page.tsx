"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';



import { ShoppingCart, Search, Filter, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWCProducts } from '@/lib/woocommerce';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { cn, getSecureImageUrl } from '@/lib/utils';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Responsive items per page
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(10); // 2x5 for mobile
      } else {
        setItemsPerPage(20); // 4x5 for desktop
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      
      

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
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentPage(1);
                      }}
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
              placeholder="Search formulations (e.g. Swarnaprash, Omega 3)..."
              className="pl-12 bg-white border-brand-gold/10 h-14 rounded-2xl shadow-lg focus:ring-brand-gold/20 transition-all text-brand-forest font-medium"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10">
              {[...Array(itemsPerPage)].map((_, i) => (
                <div key={i} className="bg-white/50 animate-pulse rounded-[1.5rem] md:rounded-[2.5rem] aspect-[3/4]" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                {currentItems.map((product) => {
                  const cleanedName = product.name ? product.name.replace(/&amp;/g, '&') : '';
                  return (
                    <div key={product.id} className="group relative">
                      <Link href={`/product/${product.slug || product.id}`}>
                        <div className="bg-white rounded-sm p-2.5 md:p-3.5 shadow-sm hover:shadow-md border-0 transition-all duration-350 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                          <div className="relative aspect-square rounded-sm overflow-hidden mb-3 bg-brand-cream/20 flex items-center justify-center p-0">
                            <img 
                              src={getSecureImageUrl(product.images?.[0]?.src) || "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"} 
                              alt={cleanedName} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          <div className="flex-1 px-1">
                            <h3 className="text-brand-forest font-serif text-sm md:text-lg font-bold mb-1 md:mb-2 group-hover:text-brand-gold transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] leading-snug">
                              {cleanedName}
                            </h3>
                            <p className="text-brand-black/50 text-[10px] md:text-xs line-clamp-2 leading-relaxed mb-3 md:mb-4" dangerouslySetInnerHTML={{ __html: product.short_description }} />
                          </div>

                          <div className="flex items-center justify-between mt-auto px-1">
                            <div className="flex flex-col">
                              {product.on_sale && product.regular_price ? (
                                <div className="flex flex-col">
                                  <span className="text-brand-black/30 text-[10px] md:text-xs line-through">₹{product.regular_price}</span>
                                  <span className="text-brand-gold font-bold text-sm md:text-xl">₹{product.price}</span>
                                </div>
                              ) : (
                                <span className="text-brand-gold font-bold text-sm md:text-xl">₹{product.price}</span>
                              )}
                            </div>
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                                toast.success(`${cleanedName} added to cart`);
                              }}
                              className="w-8 h-8 md:w-11 md:h-11 bg-brand-forest text-brand-gold rounded-sm flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-500 shadow-md active:scale-95"
                            >
                              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                    className="w-12 h-12 rounded-xl border-brand-gold/20 text-brand-forest hover:bg-brand-gold hover:text-brand-black disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={cn(
                        "w-12 h-12 rounded-xl font-bold transition-all",
                        currentPage === i + 1 
                          ? "bg-brand-forest text-brand-gold shadow-lg" 
                          : "bg-white text-brand-forest border border-brand-gold/20 hover:bg-brand-gold/5"
                      )}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => paginate(currentPage + 1)}
                    className="w-12 h-12 rounded-xl border-brand-gold/20 text-brand-forest hover:bg-brand-gold hover:text-brand-black disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 md:py-32 bg-white rounded-[3rem] border border-dashed border-brand-gold/30">
              <Search className="w-16 h-16 text-brand-gold/20 mx-auto mb-6" />
              <h2 className="text-brand-forest font-serif text-2xl md:text-3xl font-bold mb-2">No formulations found</h2>
              <p className="text-brand-black/40">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </main>

      
    </div>
  );
};

export default ProductsPage;