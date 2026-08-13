"use client";

import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info, CheckCircle2, ChevronRight, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { useWCProducts } from '@/lib/woocommerce';


import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Products = () => {
  const { products: wcProducts, loading } = useWCProducts();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // DYNAMIC CATEGORIES: Extract from products automatically
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    wcProducts.forEach(p => {
      p.categories?.forEach((c: any) => cats.add(c.name));
    });
    return Array.from(cats);
  }, [wcProducts]);

  const currentProducts = useMemo(() => {
    return wcProducts.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.categories?.[0]?.name || "Wellness",
      price: p.price || "999",
      regular_price: p.regular_price,
      on_sale: p.on_sale,
      description: p.short_description || p.description || "Authentic Ayurvedic formulation.",
      image: p.images?.[0]?.src || "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=400",
      benefits: ["Natural Ingredients", "Traditional Method", "Quality Assured", "Scientifically Tested"]
    }));
  }, [wcProducts]);

  const filteredProducts = activeCategory === "All" 
    ? currentProducts 
    : currentProducts.filter(p => p.category === activeCategory);

  const handleEnquire = (product: any) => {
    const message = `Hi Om Ayurveda, I'm interested in ${product.name}. Please provide more details.`;
    window.open(`https://wa.me/917015001978?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="products" className="py-16 md:py-32 bg-brand-forest relative overflow-hidden">
      {/* Abstract Design Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50 md:opacity-100" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-50 md:opacity-100" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="text-brand-gold font-serif text-xs md:text-sm uppercase tracking-[0.4em] mb-3 md:mb-4 font-bold">Clinical Formularies</h2>
          <h3 className="text-brand-cream font-serif text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8 leading-tight">Authentic Ayurvedic Solutions</h3>
          <p className="text-brand-cream/60 text-base md:text-lg lg:text-xl font-light italic">
            "Bridging ancient Vedic tradition with clinical precision for holistic healing."
          </p>
          <div className="w-12 md:w-16 h-1 bg-brand-gold mx-auto rounded-full mt-6 md:mt-8" />
        </div>
        
        {/* PREMIUM DROPDOWN FILTER */}
        <div className="max-w-xs mx-auto mb-16 relative">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold pointer-events-none">
              <Filter className="w-4 h-4" />
            </div>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-brand-cream/5 border border-brand-gold/30 text-brand-cream rounded-2xl py-4 pl-12 pr-10 appearance-none cursor-pointer focus:outline-none focus:border-brand-gold transition-colors font-bold tracking-wide text-sm shadow-2xl backdrop-blur-md"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-brand-forest text-brand-cream">
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gold pointer-events-none">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
          <div className="mt-2 text-center">
            <span className="text-brand-gold/40 text-[10px] uppercase tracking-widest font-bold">Showing {filteredProducts.length} Results</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col bg-brand-cream/[0.02] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-700 hover:-translate-y-2 relative">
                <Link href={`/product/${product.slug || product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-brand-cream/5">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-4 md:p-6 transition-transform duration-1000 group-hover:scale-105 bg-white"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/products/placeholder.png'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Link>
                
                <div className="p-6 md:p-10 flex flex-col flex-1 bg-gradient-to-b from-transparent to-brand-forest/40">
                  <div className="mb-4">
                    <span className="text-brand-gold text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">{product.category}</span>
                    <Link href={`/product/${product.slug || product.id}`} className="block group/title">
                      <h4 className="text-brand-cream font-serif text-2xl md:text-3xl font-bold leading-tight group-hover/title:text-brand-gold transition-colors">
                        {product.name}
                      </h4>
                    </Link>
                  </div>

                  <div 
                    className="text-brand-cream/40 mb-6 md:mb-10 text-xs md:text-sm leading-relaxed line-clamp-2 font-light italic"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                  
                  <div className="mt-auto flex items-center justify-between gap-4 md:gap-6">
                    <div className="flex flex-col">
                      <span className="text-brand-cream/30 text-[9px] md:text-[10px] uppercase font-bold tracking-widest leading-none mb-1">M.R.P</span>
                      <div className="flex items-center gap-2">
                        {product.on_sale && product.regular_price && (
                          <span className="text-brand-cream/40 line-through text-sm md:text-base font-bold">
                            ₹{product.regular_price}
                          </span>
                        )}
                        <span className="text-brand-gold font-serif text-2xl md:text-3xl font-bold">
                          {product.price.startsWith('From') ? product.price : `₹${product.price}`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 max-w-[140px] md:max-w-none">
                      <Button 
                        className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-bold h-12 md:h-14 rounded-xl md:rounded-2xl px-4 md:px-8 shadow-lg transition-transform active:scale-95 group-hover:shadow-brand-gold/20"
                        onClick={() => {
                          addToCart(product);
                          toast.success(`${product.name} added to cart`);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="bg-brand-cream border-brand-gold/30 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="rounded-2xl overflow-hidden h-48 md:h-[400px] lg:h-full">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 text-brand-black">
                <div>
                  <span className="text-brand-goldDark font-bold text-xs md:text-sm uppercase tracking-widest">{selectedProduct.category}</span>
                  <DialogTitle className="text-brand-forest font-serif text-2xl md:text-3xl font-bold mt-1 leading-tight">{selectedProduct.name}</DialogTitle>
                  <p className="text-brand-goldDark font-bold text-xl md:text-2xl mt-1">
                    {selectedProduct.price.startsWith('From') ? selectedProduct.price : `₹${selectedProduct.price}`}
                  </p>
                </div>
                
                <div 
                  className="text-brand-black/70 text-sm md:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                />

                <div className="space-y-2">
                  <p className="font-bold text-brand-forest text-sm uppercase tracking-widest">Key Benefits</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.benefits.map((benefit: string, i: number) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="text-brand-gold w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="text-brand-black/80 text-xs md:text-sm leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <Button 
                    className="snipcart-add-item w-full bg-brand-forest hover:bg-brand-forest/90 text-brand-cream font-bold py-5 md:py-6 h-auto text-base md:text-lg rounded-xl"
                    data-item-id={selectedProduct.id}
                    data-item-name={selectedProduct.name}
                    data-item-price={selectedProduct.price}
                    data-item-url={`${window.location.origin}/products`}
                    data-item-description={selectedProduct.description.replace(/<[^>]*>?/gm, '')}
                    data-item-image={selectedProduct.image}
                    onClick={() => setSelectedProduct(null)}
                  >
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full font-bold py-3 md:py-4 h-auto rounded-xl border-brand-forest text-brand-forest hover:bg-brand-forest/5"
                    onClick={() => handleEnquire(selectedProduct)}
                  >
                    Enquire on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Products;