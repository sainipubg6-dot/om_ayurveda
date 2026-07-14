import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { 
  ShoppingCart, ArrowLeft, CheckCircle2, ShieldCheck, 
  Truck, RefreshCw, Star, Maximize2, X, ChevronLeft, ChevronRight, Info
} from 'lucide-react';
import { useWCProducts } from '@/lib/woocommerce';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { products: wcProducts, loading } = useWCProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!loading && wcProducts?.length > 0) {
      const foundProduct = wcProducts.find(p => 
        (p.slug === slug) || (String(p.id) === String(slug))
      );
      
      if (foundProduct) {
        const hasDiscount = foundProduct.on_sale && foundProduct.regular_price && foundProduct.regular_price !== foundProduct.price;

        const cleanedProduct = {
          id: foundProduct.id,
          name: foundProduct.name || "Ayurvedic Formulation",
          category: foundProduct.categories?.[0]?.name || "Wellness",
          price: foundProduct.price || "0",
          regularPrice: foundProduct.regular_price || null,
          onSale: hasDiscount,
          description: foundProduct.description || foundProduct.short_description || "Authentic Ayurvedic formulation.",
          shortDescription: foundProduct.short_description?.replace(/<[^>]*>?/gm, '') || "Premium Ayurvedic wellness solution.",
          images: foundProduct.images?.length > 0 
            ? foundProduct.images.map((img: any) => (typeof img === 'string' ? img : img.src))
            : ["https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"]
        };
        
        setProduct(cleanedProduct);
        setActiveImage(0);
      }
    }
  }, [slug, wcProducts, loading]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const len = product?.images?.length || 1;
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : len - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const len = product?.images?.length || 1;
    setLightboxIndex((prev) => (prev < len - 1 ? prev + 1 : 0));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-brand-forest font-serif text-3xl mb-4">Formulation Not Found</h2>
        <p className="text-brand-black/60 mb-8">This product might be loading or recently removed.</p>
        <Link to="/products">
          <button className="bg-brand-gold text-brand-black px-8 py-3 rounded-xl font-bold">
            Return to Apothecary
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream selection:bg-brand-gold selection:text-brand-black">
      <Seo 
        title={`${product?.name} - Ayurveda Veda`} 
        description={product?.shortDescription} 
      />
      <Navbar />
      
      <main className="flex-1 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/products" 
              className="inline-flex items-center text-brand-forest/60 hover:text-brand-gold transition-colors mb-6 md:mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Collections
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 mb-16 md:mb-24">
              {/* Product Gallery */}
              <div className="space-y-4 md:space-y-6">
                <div 
                  className="relative group rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border-[6px] md:border-[12px] border-white aspect-[4/5] md:aspect-square cursor-zoom-in"
                  onClick={() => {
                    setLightboxIndex(activeImage);
                    setIsLightboxOpen(true);
                  }}
                >
                  <img 
                    src={product?.images?.[activeImage] || "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"} 
                    alt={product?.name} 
                    className="w-full h-full object-contain bg-white transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/5 transition-colors duration-500" />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/90 backdrop-blur-md p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl border border-brand-gold/10">
                    <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-brand-forest" />
                  </div>
                  {product.onSale && (
                    <div className="absolute top-6 left-6 bg-red-500 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-xl animate-bounce">
                      SPECIAL OFFER
                    </div>
                  )}
                </div>

                <div className="flex overflow-x-auto gap-2 md:gap-3 pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-brand-gold/20">
                  {(product?.images || []).map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "relative flex-shrink-0 snap-start rounded-xl overflow-hidden border-2 transition-all duration-300",
                        "w-16 h-16 md:w-24 md:h-24",
                        activeImage === i ? "border-brand-gold shadow-lg scale-95" : "border-white hover:border-brand-gold/30"
                      )}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="mb-2 md:mb-4 flex items-center gap-2">
                  <span className="bg-brand-gold/10 text-brand-gold font-bold text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] px-2.5 md:px-4 py-0.5 md:py-1.5 rounded-full border border-brand-gold/20">
                    {product?.category}
                  </span>
                  <div className="flex gap-1 ml-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                </div>

                <h1 className="text-brand-forest font-serif text-2xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-8 leading-[1.2] md:leading-[1.1]">
                  {product?.name}
                </h1>
                
                <div className="flex items-center gap-4 md:gap-8 mb-6 md:mb-12">
                  <div className="flex flex-col">
                    <span className="text-brand-black/30 text-[8px] md:text-[10px] uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] mb-1">Clinic Price</span>
                    <div className="flex items-baseline gap-2 md:gap-3">
                      {product.onSale && (
                        <span className="text-brand-black/20 line-through text-lg md:text-2xl font-medium">₹{product.regularPrice}</span>
                      )}
                      <span className="text-brand-forest text-2xl md:text-5xl font-bold font-serif whitespace-nowrap">₹{product.price}</span>
                    </div>
                  </div>
                  <div className="h-8 md:h-16 w-px bg-brand-gold/20" />
                  <div className="flex flex-col">
                    <span className="text-brand-black/30 text-[8px] md:text-[10px] uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] mb-1">Availability</span>
                    <span className="text-brand-leaf font-bold text-base md:text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-leaf rounded-full animate-pulse" />
                      Fresh Stock
                    </span>
                  </div>
                </div>



                <div className="mb-8 md:mb-16 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <button 
                    className="w-full border-2 border-brand-forest text-brand-forest hover:bg-brand-forest/5 font-bold py-3 md:py-6 text-base md:text-xl rounded-xl md:rounded-[1.5rem] transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-3"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product?.name} added to cart`);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 md:w-6 md:h-6" />
                    Add to Cart
                  </button>
                  <button 
                    className="w-full bg-brand-forest hover:bg-brand-forest/95 text-brand-gold font-bold py-3 md:py-6 text-base md:text-xl rounded-xl md:rounded-[1.5rem] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-3"
                    onClick={() => {
                      addToCart(product);
                      navigate('/checkout');
                    }}
                  >
                    Buy Now
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 md:gap-6 bg-white/40 backdrop-blur-xl p-4 md:p-8 rounded-[1.25rem] md:rounded-[2rem] border border-brand-gold/5 shadow-xl">
                  {[
                    { icon: ShieldCheck, label: "GMP Certified" },
                    { icon: Truck, label: "Fast Shipping" },
                    { icon: RefreshCw, label: "Quality Lab Tested" },
                    { icon: CheckCircle2, label: "100% Ayurvedic" }
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 md:gap-4 group">
                      <div className="w-6 h-6 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-forest/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                        <badge.icon className="text-brand-gold w-3 h-3 md:w-5 md:h-5" />
                      </div>
                      <span className="text-brand-forest font-bold text-[8px] md:text-xs uppercase tracking-widest leading-none">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amazon-style Accordion Section */}
            <div className="bg-white rounded-[2rem] md:rounded-[4rem] shadow-xl p-6 md:p-10 md:p-20 mb-16 md:mb-32 border border-brand-gold/5 relative overflow-hidden">
              <Accordion type="single" collapsible defaultValue="details" className="w-full">
                <AccordionItem value="highlights" className="border-b border-brand-gold/10 py-2">
                  <AccordionTrigger className="text-brand-forest hover:text-brand-gold font-serif text-xl md:text-3xl font-bold">
                    Top highlights
                  </AccordionTrigger>
                  <AccordionContent className="text-brand-black text-base md:text-xl leading-relaxed pt-4 pb-6 italic">
                    {product?.shortDescription}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="details" className="border-b border-brand-gold/10 py-2">
                  <AccordionTrigger className="text-brand-forest hover:text-brand-gold font-serif text-xl md:text-3xl font-bold">
                    Product details
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-6">
                    <div className="relative z-10">
                      <div className={cn(
                        "text-black text-base md:text-xl leading-relaxed font-medium transition-all duration-500 overflow-hidden relative",
                        isDescriptionExpanded ? "max-h-none" : "max-h-[300px] md:max-h-[400px]"
                      )}>
                        <div 
                          className="description-content [&_*]:text-black [&_h1]:text-black [&_h2]:text-black [&_h3]:text-black [&_p]:text-black [&_ul]:text-black [&_ol]:text-black [&_span]:text-black"
                          style={{ color: 'black' }}
                          dangerouslySetInnerHTML={{ __html: product?.description || "" }} 
                        />
                        
                        {!isDescriptionExpanded && (
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        )}
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                        <button 
                          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                          className="bg-brand-forest text-brand-gold font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center text-sm md:text-base border border-brand-gold/20"
                        >
                          {isDescriptionExpanded ? "Read Less" : "Read More"}
                        </button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="specifications" className="border-b-0 py-2">
                  <AccordionTrigger className="text-brand-forest hover:text-brand-gold font-serif text-xl md:text-3xl font-bold">
                    Product specifications
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-lg">
                      <div className="flex border-b border-brand-black/5 pb-2">
                        <span className="text-brand-black/50 font-bold w-1/3">Category</span>
                        <span className="text-brand-black font-medium">{product?.category}</span>
                      </div>
                      <div className="flex border-b border-brand-black/5 pb-2">
                        <span className="text-brand-black/50 font-bold w-1/3">Availability</span>
                        <span className="text-brand-leaf font-medium">Fresh Stock</span>
                      </div>
                      <div className="flex border-b border-brand-black/5 pb-2">
                        <span className="text-brand-black/50 font-bold w-1/3">Quality</span>
                        <span className="text-brand-black font-medium">100% Ayurvedic</span>
                      </div>
                      <div className="flex border-b border-brand-black/5 pb-2">
                        <span className="text-brand-black/50 font-bold w-1/3">Shipping</span>
                        <span className="text-brand-black font-medium">Fast Shipping Available</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Recommended Products Section */}
            {wcProducts && wcProducts.length > 1 && (
              <div className="mb-16 md:mb-32">
                <h2 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold mb-8 md:mb-12">Recommended Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                  {(
                    wcProducts.filter((p: any) => p.id !== product.id && p.categories?.[0]?.name === product.category).length > 0
                      ? wcProducts.filter((p: any) => p.id !== product.id && p.categories?.[0]?.name === product.category)
                      : wcProducts.filter((p: any) => p.id !== product.id)
                  )
                    .slice(0, 4)
                    .map((relatedProduct: any) => (
                      <Link 
                        key={relatedProduct.id}
                        to={`/product/${relatedProduct.slug}`} 
                        className="group bg-white rounded-2xl md:rounded-[2rem] p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all border border-brand-gold/5 flex flex-col"
                      >
                        <div className="aspect-square bg-brand-cream/50 rounded-xl md:rounded-2xl mb-4 overflow-hidden">
                          <img 
                            src={relatedProduct.images?.[0]?.src || "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"} 
                            alt={relatedProduct.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <h3 className="font-serif font-bold text-brand-forest text-base md:text-xl mb-2 line-clamp-2 flex-grow">{relatedProduct.name}</h3>
                        <div className="flex items-center gap-2 mt-auto">
                          <span className="text-brand-forest font-bold text-lg md:text-2xl">₹{relatedProduct.price}</span>
                          {relatedProduct.regular_price && relatedProduct.regular_price !== relatedProduct.price && (
                            <span className="text-brand-black/30 line-through text-sm">₹{relatedProduct.regular_price}</span>
                          )}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-brand-black/95 border-none flex items-center justify-center">
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white z-50"><X className="w-8 h-8" /></button>
          <button onClick={handlePrev} className="absolute left-4 text-white/50 hover:text-white p-2 z-50"><ChevronLeft className="w-12 h-12" /></button>
          <img src={product?.images?.[lightboxIndex]} alt="Gallery" className="max-w-full max-h-[85vh] object-contain" />
          <button onClick={handleNext} className="absolute right-4 text-white/50 hover:text-white p-2 z-50"><ChevronRight className="w-12 h-12" /></button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;
