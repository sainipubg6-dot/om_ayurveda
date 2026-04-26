import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { 
  ShoppingCart, ArrowLeft, CheckCircle2, ShieldCheck, 
  Truck, RefreshCw, Star, Info, List, HelpCircle, 
  MessageSquare, ChevronRight, Maximize2, X, ChevronLeft, Leaf 
} from 'lucide-react';
import { useWCProducts } from '@/lib/woocommerce';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
    if (!loading && wcProducts?.length > 0) {
      // Find the product by ID
      const rawProduct = wcProducts.find(p => String(p.id) === String(id));
      
      if (rawProduct) {
        // Deep clean the data to prevent any crashes
        const cleanedProduct = {
          id: rawProduct.id,
          name: rawProduct.name || "Ayurvedic Formulation",
          category: rawProduct.categories?.[0]?.name || "Wellness",
          price: rawProduct.price || "0",
          description: rawProduct.description || rawProduct.short_description || "Authentic Ayurvedic formulation.",
          shortDescription: rawProduct.short_description?.replace(/<[^>]*>?/gm, '') || "Premium Ayurvedic wellness solution.",
          images: rawProduct.images?.length > 0 
            ? rawProduct.images.map((img: any) => (typeof img === 'string' ? img : img.src))
            : ["https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"],
          ingredients: ["Natural Extracts", "Vedic Herbs", "Custom Medicated Oil"],
          faq: [
            { q: "Usage Instructions", a: "Take 1-2 capsules daily with lukewarm water or as directed by your physician." },
            { q: "Safety Information", a: "Store in a cool, dry place. Consult a physician if pregnant or on medication." }
          ],
          reviews: [
            { name: "Suresh K.", rating: 5, comment: "Genuine product. I can feel the difference in energy levels.", date: "4 days ago" },
            { name: "Priya M.", rating: 5, comment: "High quality herbs. Definitely recommending.", date: "1 week ago" }
          ]
        };
        
        setProduct(cleanedProduct);
        setActiveImage(0);
      }
    }
  }, [id, wcProducts, loading]);

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

  const tabs = [
    { id: 'description', label: 'Details', icon: Info },
    { id: 'ingredients', label: 'Ingredients', icon: List },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-gold selection:text-brand-black">
      <Seo 
        title={`${product?.name} - Ayurveda Veda`} 
        description={product?.shortDescription} 
      />
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
                    src={product?.images?.[activeImage] || "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"} 
                    alt={product?.name} 
                    className="w-full h-full object-contain bg-white transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/5 transition-colors duration-500" />
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-brand-gold/10">
                    <Maximize2 className="w-5 h-5 text-brand-forest" />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {(product?.images || []).map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "relative aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-300",
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
                <div className="mb-4 flex items-center gap-2">
                  <span className="bg-brand-gold/10 text-brand-gold font-bold text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-brand-gold/20">
                    {product?.category}
                  </span>
                  <div className="flex gap-1 ml-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                </div>

                <h1 className="text-brand-forest font-serif text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">
                  {product?.name}
                </h1>
                
                <div className="flex items-center gap-8 mb-12">
                  <div className="flex flex-col">
                    <span className="text-brand-black/30 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Clinic Price</span>
                    <span className="text-brand-forest text-5xl font-bold font-serif whitespace-nowrap">₹{product?.price}</span>
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
                  {product?.shortDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <button 
                    className="flex-1 bg-brand-forest hover:bg-brand-forest/95 text-brand-gold font-bold py-8 text-xl rounded-[1.5rem] shadow-xl transition-all"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product?.name} added to cart`);
                    }}
                  >
                    <ShoppingCart className="w-6 h-6 mr-3 inline" />
                    Add to Cart
                  </button>
                  <button 
                    className="flex-1 border-2 border-brand-gold/30 text-brand-forest hover:bg-brand-gold/5 py-8 text-xl rounded-[1.5rem] transition-all"
                    onClick={() => {
                      const message = `Namaste! I'm interested in ${product?.name}. Please share more details.`;
                      window.open(`https://wa.me/917015001978?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    Medical Inquiry
                  </button>
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
            <div className="bg-white rounded-[4rem] shadow-xl p-10 md:p-20 mb-32 border border-brand-gold/5 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 border-b border-brand-gold/10 pb-10 mb-16 relative z-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 px-8 py-4 rounded-2xl transition-all text-sm uppercase tracking-[0.2em] font-bold",
                      activeTab === tab.id ? "bg-brand-forest text-brand-gold" : "text-brand-black/30 hover:text-brand-forest"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative z-10 min-h-[300px]">
                {activeTab === 'description' && (
                  <div className="space-y-10 max-w-4xl">
                    <div 
                      className="text-brand-black/70 text-xl leading-relaxed prose prose-green prose-xl max-w-none font-light"
                      dangerouslySetInnerHTML={{ __html: product?.description || "" }}
                    />
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(product?.ingredients || []).map((ing: string, i: number) => (
                      <div key={i} className="flex items-center gap-6 p-8 bg-brand-cream rounded-[2rem] hover:bg-brand-gold/10 transition-all">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                          <Leaf className="text-brand-gold w-8 h-8" />
                        </div>
                        <span className="text-brand-forest font-bold text-xl">{ing}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="max-w-4xl mx-auto space-y-8">
                    {(product?.faq || []).map((faq: any, i: number) => (
                      <div key={i} className="bg-brand-cream/50 p-10 rounded-[2.5rem] border border-brand-gold/10">
                        <h5 className="text-brand-forest font-bold text-2xl mb-6 flex items-start gap-5">
                          <span className="w-10 h-10 rounded-2xl bg-brand-gold text-brand-black flex items-center justify-center shrink-0 font-bold">Q</span>
                          {faq.q}
                        </h5>
                        <p className="text-brand-black/60 text-lg leading-relaxed pl-16">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(product?.reviews || []).map((review: any, i: number) => (
                      <div key={i} className="p-10 rounded-[3rem] bg-brand-forest/[0.02] border border-brand-gold/5">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <div className="flex gap-1 mb-3">
                              {[...Array(review.rating || 5)].map((_, s) => (
                                <Star key={s} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                              ))}
                            </div>
                            <h6 className="text-brand-forest font-bold text-2xl">{review.name}</h6>
                          </div>
                          <span className="text-brand-black/20 text-xs font-bold uppercase">{review.date}</span>
                        </div>
                        <p className="text-brand-black/70 text-lg italic">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-brand-black/95 border-none flex items-center justify-center">
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X className="w-8 h-8" /></button>
          <button onClick={handlePrev} className="absolute left-4 text-white/50 hover:text-white p-2"><ChevronLeft className="w-12 h-12" /></button>
          <img src={product?.images?.[lightboxIndex]} alt="Gallery" className="max-w-full max-h-[85vh] object-contain" />
          <button onClick={handleNext} className="absolute right-4 text-white/50 hover:text-white p-2"><ChevronRight className="w-12 h-12" /></button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;
