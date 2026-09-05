"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, getSecureImageUrl } from '@/lib/utils';
import { WCProduct } from '@/lib/woocommerce';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductsClient({ products }: { products: WCProduct[] }) {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
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
    <>
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
                    "rounded-xl font-medium cursor-pointer transition-colors px-4 py-3 text-sm",
                    selectedCategory === cat 
                      ? "bg-brand-gold/10 text-brand-forest font-bold" 
                      : "hover:bg-brand-gold/5 focus:bg-brand-gold/5"
                  )}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-black/30 group-focus-within:text-brand-gold transition-colors" />
            <Input 
              type="text" 
              placeholder="Search formulations..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-64 pl-10 pr-4 h-12 bg-white border-brand-gold/20 focus:border-brand-gold/40 focus:ring-4 focus:ring-brand-gold/10 rounded-xl transition-all shadow-sm font-medium"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {currentItems.map((product) => {
          const hasDiscount = product.on_sale && product.regular_price && product.regular_price !== product.price;
          const imgSrc = product.images?.[0]?.src ? getSecureImageUrl(product.images[0].src) : "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800";
          const shortDesc = product.short_description?.replace(/<[^>]*>?/gm, '') || product.description?.replace(/<[^>]*>?/gm, '');

          return (
            <Link 
              key={product.id} 
              href={`/product/${product.slug || product.id}`}
              className="group flex flex-col bg-white rounded-[2rem] border border-brand-forest/5 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
            >
              {hasDiscount && (
                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 bg-red-500/90 backdrop-blur-md text-white text-[9px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg">
                  SALE
                </div>
              )}
              <div className="relative aspect-square overflow-hidden bg-brand-forest/5 p-4 md:p-6">
                <img 
                  src={imgSrc} 
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110 drop-shadow-sm"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-sm md:text-lg font-bold text-brand-forest line-clamp-2 leading-snug mb-1 md:mb-2 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                
                {shortDesc && (
                  <p className="text-brand-black/60 text-[10px] md:text-xs line-clamp-2 mb-3 md:mb-4 flex-grow">
                    {shortDesc}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 md:pt-4 border-t border-brand-forest/5">
                  <div className="flex flex-col">
                    <span className="font-bold text-brand-forest text-sm md:text-xl flex items-center">
                      <span className="text-xs md:text-sm mr-0.5">₹</span>{product.price}
                    </span>
                    {hasDiscount && (
                      <span className="text-[10px] md:text-xs text-brand-black/40 line-through">
                        ₹{product.regular_price}
                      </span>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-brand-forest text-white hover:bg-brand-gold hover:text-white hover:scale-110 transition-all shadow-md group-hover:shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({
                        id: product.id.toString(),
                        name: product.name,
                        price: parseFloat(product.price) || 0,
                        image: imgSrc,
                        quantity: 1
                      });
                      toast.success('Added to cart');
                    }}
                  >
                    <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {currentItems.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-brand-forest/5 shadow-sm">
          <p className="text-brand-black/50 text-lg font-medium">No formulations found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-6 border-brand-gold/20 text-brand-forest hover:bg-brand-gold/5"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full w-10 h-10 border-brand-gold/20 text-brand-forest hover:bg-brand-gold/5 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
              if (
                number === 1 || 
                number === totalPages || 
                (number >= currentPage - 1 && number <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    className={cn(
                      "w-10 h-10 rounded-full font-bold transition-all",
                      currentPage === number 
                        ? "bg-brand-forest text-white hover:bg-brand-forest/90 shadow-md" 
                        : "border-brand-gold/20 text-brand-forest hover:bg-brand-gold/5"
                    )}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Button>
                );
              } else if (
                number === currentPage - 2 ||
                number === currentPage + 2
              ) {
                return <span key={number} className="text-brand-black/30 px-1">...</span>;
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-full w-10 h-10 border-brand-gold/20 text-brand-forest hover:bg-brand-gold/5 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </>
  );
}
