import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { ShoppingCart, ArrowLeft, CheckCircle2, ShieldCheck, Truck, RefreshCw, Star, Info, List, HelpCircle, MessageSquare, ChevronRight, Maximize2, X, ChevronLeft, Leaf } from 'lucide-react';
import { useWCProducts } from '@/lib/woocommerce';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
const ProductDetailPage = () => {
  const { id } = useParams();
  const { products: wcProducts, loading } = useWCProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!loading) {
      let foundProduct = null;
      if (wcProducts.length > 0) {
        const wcP = wcProducts.find(p => p.id === Number(id));
        if (wcP) {
          foundProduct = {
            id: wcP.id,
            name: wcP.name,
            category: wcP.categories?.[0]?.name || "Wellness",
            price: wcP.price || "999",
            description: wcP.description || wcP.short_description || "Authentic Ayurvedic formulation.",
            shortDescription: "Premium Ayurvedic wellness solution.",
            images: wcP.images?.map(img => img.src) || [
              "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1584017945516-60a7d46273b4?auto=format&fit=crop&q=80&w=800"
            ],
            ingredients: ["Natural Extracts", "Vedic Herbs", "Custom Medicated Oil"],
            faq: [
              { q: "How to use this formulation?", a: "Take 1-2 capsules daily with lukewarm water or as directed by your physician." },
              { q: "Is it safe for long-term use?", a: "Yes, our formulations are 100% natural and safe for extended use as part of a healthy lifestyle." }
            ],
            reviews: [
              { name: "Suresh K.", rating: 5, comment: "Genuine product. I can feel the difference in my energy levels.", date: "4 days ago" },
              { name: "Priya M.", rating: 5, comment: "High quality herbs. Definitely recommending to my family.", date: "1 week ago" }
            ]
          };
        }
      }

      setProduct(foundProduct);
      setActiveImage(0);
    }
  }, [id, wcProducts, loading]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : (product?.images?.length || 1) - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev < (product?.images?.length || 1) - 1 ? prev + 1 : 0));
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
        <Link to="/products">
          <Button className="bg-brand-gold text-brand-black">Return to Apothecary</Button>
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'description', label: 'Details', icon: Info },
    { id: 'ingredients', label: 'Ingredients', icon: List },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-gold selection:text-brand-black">
      <Seo title={product.name + " - Ayurveda Veda"} description={product.shortDescription} />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container px-6">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/products" 
              className="inline-flex items-center text-brand-forest/60 hover:text-brand-gold transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Collections
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-24">
              {/* Product Gallery */}
              <div className="space-y-6">
                <div 
                  className="relative group rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border-[12px] border-white aspect-[4/5] md:aspect-square cursor-zoom-in"
                  onClick={() => {
                    setLightboxIndex(activeImage);
                    setIsLightboxOpen(true);
                  }}
                >
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-contain bg-white transition-transform duration-700 group-hover:scale-105"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/products/placeholder.png'; }}
                  />
                  <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/5 transition-colors duration-500" />
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-brand-gold/10">
                    <Maximize2 className="w-5 h-5 text-brand-forest" />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "aspect-[4/5] rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white shadow-sm",
                        activeImage === i 
                          ? "border-brand-gold ring-4 ring-brand-gold/10 scale-95" 
                          : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                      )}
                    >
                      <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-contain bg-white" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/products/placeholder.png'; }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="mb-4 flex items-center gap-2">
                  <span className="bg-brand-gold/10 text-brand-gold font-bold text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-brand-gold/20">
                    {product.category}
                  </span>
                  <div className="flex gap-1 ml-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                </div>

                <h1 className="text-brand-forest font-serif text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-8 mb-12">
                  <div className="flex flex-col">
                    <span className="text-brand-black/30 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Clinic Price</span>
                    <span className="text-brand-forest text-5xl font-bold font-serif whitespace-nowrap">₹{product.price}</span>
                  </div>
                  <div className="h-16 w-px bg-brand-gold/20" />
                  <div className="flex flex-col">
                    <span className="text-brand-black/30 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Availability</span>
                    <span className="text-brand-leaf font-bold text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-leaf rounded-full animate-pulse" />
                      Fresh Stock
                    </span>
                  </div>
                </div>

                <p className="text-brand-black/70 text-xl mb-12 leading-relaxed font-light border-l-4 border-brand-gold/30 pl-8 italic">
                  {product.shortDescription || product.name}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <Button 
                    className="flex-1 bg-brand-forest hover:bg-brand-forest/95 text-brand-gold font-bold py-10 text-2xl rounded-[1.5rem] shadow-[0_20px_40px_rgba(26,47,35,0.2)] transition-all hover:-translate-y-1 active:translate-y-0"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart`);
                    }}
                  >
                    <ShoppingCart className="w-7 h-7 mr-4" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-brand-gold/30 text-brand-forest hover:bg-brand-gold/5 py-10 text-2xl rounded-[1.5rem] border-2"
                    onClick={() => {
                      const message = `Namaste! I'm interested in ${product.name}. Could you please share more details?`;
                      window.open(`https://wa.me/917015001978?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    Medical Inquiry
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-6 bg-white/40 backdrop-blur-xl p-8 rounded-[2rem] border border-brand-gold/5 shadow-xl">
                  {[
                    { icon: ShieldCheck, label: "GMP Certified" },
                    { icon: Truck, label: "Fast Shipping" },
                    { icon: RefreshCw, label: "Quality Lab Tested" },
                    { icon: CheckCircle2, label: "100% Ayurvedic" }
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-brand-forest/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                        <badge.icon className="text-brand-gold w-5 h-5" />
                      </div>
                      <span className="text-brand-forest font-bold text-xs uppercase tracking-widest leading-none">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Tabs Section */}
            <div className="bg-white rounded-[4rem] shadow-[0_50px_100px_rgba(26,47,35,0.08)] p-10 md:p-20 mb-32 border border-brand-gold/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full -mr-[250px] -mt-[250px] blur-[100px] opacity-30" />
              
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 border-b border-brand-gold/10 pb-10 mb-16 relative z-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 px-8 py-4 rounded-2xl transition-all text-sm uppercase tracking-[0.2em] font-bold relative",
                      activeTab === tab.id 
                        ? "bg-brand-forest text-brand-gold shadow-2xl scale-105" 
                        : "text-brand-black/30 hover:text-brand-forest hover:bg-brand-forest/5"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-gold rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="relative z-10 min-h-[400px]">
                {activeTab === 'description' && (
                  <div className="space-y-10 animate-in fade-in duration-700 max-w-4xl">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-brand-gold/20" />
                      <h4 className="text-brand-gold font-serif text-2xl italic">The Formulation Story</h4>
                      <div className="h-px flex-1 bg-brand-gold/20" />
                    </div>
                    <div 
                      className="text-brand-black/70 text-xl leading-relaxed prose prose-green prose-xl max-w-none font-light"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h4 className="text-brand-forest font-serif text-4xl font-bold mb-12 text-center">Sacred Herbal Synergy</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {product.ingredients?.map((ing: string, i: number) => (
                        <div key={i} className="flex items-center gap-6 p-8 bg-brand-cream rounded-[2rem] group hover:bg-brand-gold/10 transition-all duration-500 hover:shadow-xl">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-[15deg] transition-transform">
                            <Leaf className="text-brand-gold w-8 h-8" />
                          </div>
                          <span className="text-brand-forest font-bold text-xl">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="animate-in fade-in duration-700 max-w-4xl mx-auto space-y-8">
                    {product.faq?.map((faq: any, i: number) => (
                      <div key={i} className="bg-brand-cream/50 p-10 rounded-[2.5rem] border border-brand-gold/10 hover:border-brand-gold/30 transition-all">
                        <h5 className="text-brand-forest font-bold text-2xl mb-6 flex items-start gap-5">
                          <span className="w-10 h-10 rounded-2xl bg-brand-gold text-brand-black flex items-center justify-center shrink-0 font-bold shadow-lg">Q</span>
                          {faq.q}
                        </h5>
                        <p className="text-brand-black/60 text-lg leading-relaxed pl-16">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="animate-in fade-in duration-700">
                    <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center lg:items-start text-center lg:text-left">
                      <div className="bg-brand-forest text-brand-gold p-16 rounded-[3rem] shadow-[0_30px_60px_rgba(26,47,35,0.3)]">
                        <h5 className="text-8xl font-serif font-bold mb-4">4.8</h5>
                        <div className="flex gap-2 justify-center lg:justify-start mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-current" />
                          ))}
                        </div>
                        <p className="text-brand-cream/40 uppercase tracking-[0.3em] text-[10px] font-bold">Overall Patient Satisfaction</p>
                      </div>

                      <div className="flex-1">
                        <h5 className="text-brand-forest font-serif text-5xl font-bold mb-6 italic leading-snug">"Honest clinical results, rooted in tradition."</h5>
                        <p className="text-brand-black/40 text-lg mb-10 font-light">Join thousands of patients who have restored their path to wellness.</p>
                        <Button className="bg-brand-gold text-brand-black font-bold h-16 px-12 rounded-2xl shadow-2xl hover:scale-105 transition-transform text-lg">Report Your Experience</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {product.reviews?.map((review: any, i: number) => (
                        <div key={i} className="p-10 rounded-[3rem] bg-brand-forest/[0.02] border border-brand-gold/5 hover:border-brand-gold/20 transition-all">
                          <div className="flex justify-between items-start mb-8">
                            <div>
                              <div className="flex gap-1 mb-3">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                                ))}
                              </div>
                              <h6 className="text-brand-forest font-bold text-2xl">{review.name}</h6>
                            </div>
                            <span className="text-brand-black/20 text-xs font-bold uppercase tracking-widest">{review.date}</span>
                          </div>
                          <p className="text-brand-black/70 text-lg leading-relaxed italic relative">
                            <span className="text-7xl text-brand-gold/10 absolute -top-8 -left-4 font-serif">“</span>
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products Section */}
            <div className="py-32 border-t border-brand-gold/10">
              <div className="text-center mb-20">
                <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.5em] mb-4">Complementary</h2>
                <h3 className="text-brand-forest font-serif text-5xl md:text-6xl">Medical Regimen</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {staticProducts.slice(0, 4).filter(p => p.id !== product.id).map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-brand-gold/5 flex flex-col hover:-translate-y-3 transition-all duration-700 h-full p-4 hover:shadow-[0_40px_80px_rgba(26,47,35,0.1)]">
                    <div className="relative aspect-square overflow-hidden rounded-[2rem]">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110 p-6" />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <span className="text-brand-gold text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">{p.category}</span>
                      <h4 className="text-brand-forest font-serif text-2xl font-bold mb-4 group-hover:text-brand-gold transition-colors leading-tight">{p.name}</h4>
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-brand-gold/5">
                        <span className="text-brand-forest font-bold text-2xl">₹{p.price}</span>
                        <div className="w-12 h-12 bg-brand-forest rounded-2xl flex items-center justify-center text-brand-gold group-hover:shadow-lg group-hover:rotate-6 transition-all">
                          <ShoppingCart className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[100vw] h-screen bg-brand-black/98 backdrop-blur-3xl border-none p-0 flex flex-col items-center justify-center overflow-hidden [&>button]:hidden shadow-none">
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 py-6 px-10 flex justify-between items-center z-[70] bg-gradient-to-b from-brand-black/60 to-transparent">
             <div className="flex flex-col">
                <h3 className="text-brand-gold font-serif text-xl font-bold">{product.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-brand-cream/40 text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-brand-gold font-bold">{lightboxIndex + 1}</span>
                  <div className="h-3 w-px bg-brand-gold/20" />
                  <span>{product.images.length} Views Available</span>
                </div>
             </div>
             <DialogClose className="p-4 rounded-full bg-brand-cream/5 hover:bg-brand-cream/15 text-brand-cream transition-all group active:scale-95 border border-brand-cream/10">
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
             </DialogClose>
          </div>
          
          {/* Main Stage */}
          <div className="relative w-full h-full flex items-center justify-center px-4 md:px-32 select-none group/stage">
            {/* Nav Arrows - Desktop Only Hover */}
            <button 
              onClick={handlePrev}
              className="absolute left-6 md:left-12 z-[60] p-5 md:p-8 rounded-full bg-brand-cream/5 hover:bg-brand-cream/10 text-brand-gold transition-all hover:scale-110 active:scale-90 border border-brand-gold/10 opacity-0 group-hover/stage:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-12 pointer-events-none">
              <img 
                src={product.images[lightboxIndex]} 
                alt={product.name} 
                className="max-h-[75vh] max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-500 pointer-events-auto"
              />
            </div>

            <button 
              onClick={handleNext}
              className="absolute right-6 md:right-12 z-[60] p-5 md:p-8 rounded-full bg-brand-cream/5 hover:bg-brand-cream/10 text-brand-gold transition-all hover:scale-110 active:scale-90 border border-brand-gold/10 opacity-0 group-hover/stage:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
            </button>
          </div>

          {/* Footer Thumbnails - Custom Hidden Scrollbar */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center z-[70] px-10">
            <div className="flex gap-4 p-4 rounded-3xl bg-brand-cream/5 backdrop-blur-xl border border-brand-cream/10 max-w-full overflow-x-auto no-scrollbar scroll-smooth">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={cn(
                    "w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-500 shrink-0 relative group/thumb",
                    lightboxIndex === i 
                      ? "border-brand-gold scale-110 shadow-[0_0_30px_rgba(212,175,55,0.3)] ring-4 ring-brand-gold/10" 
                      : "border-brand-cream/10 opacity-40 hover:opacity-100"
                  )}
                >
                  <img src={img} className="w-full h-full object-contain p-2" />
                  {lightboxIndex === i && (
                    <div className="absolute inset-0 bg-brand-gold/5 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          ` }} />
        </DialogContent>
      </Dialog>

      {/* Floating Sticky Mobile Buy */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-forest/95 backdrop-blur-xl p-6 flex items-center gap-6 md:hidden border-t border-brand-gold/20 shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
        <div className="flex-1">
          <p className="text-brand-gold font-bold text-3xl font-serif leading-none">₹{product.price}</p>
          <p className="text-brand-cream/40 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">Clinical Value</p>
        </div>
        <Button 
          className="bg-brand-gold text-brand-black font-bold h-16 px-10 rounded-[1.25rem] shadow-2xl flex-1 max-w-[220px] text-lg transition-transform active:scale-95"
          onClick={() => {
            addToCart(product);
            toast.success(`${product.name} added to cart`);
          }}
        >
          Get Formulation
        </Button>
      </div>

      <Footer />
    </div>
  );
};

const LeafIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export default ProductDetailPage;
