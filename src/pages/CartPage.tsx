import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Seo from '@/components/Seo';

// Authoritative image map keyed by product ID — overrides stale localStorage paths
const productImageMap: Record<number, string> = {
  1:  '/images/products/omega-3-front.png',
  2:  '/images/products/liver -front.png',
  3:  '/images/products/joint-pro-front.png',
  4:  '/images/products/ortho-front.png',
  5:  '/images/products/cough-har-box.png',
  6:  '/images/products/hair-oil-front.png',
  7:  '/images/products/om power oil  -front.png',
  8:  '/images/products/om injury-front.png',
  9:  '/images/products/detox-churna-front.png',
  10: '/images/products/gokshura-front.png',
  11: '/images/products/swranprash front.png',
};

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-cream">
      <Seo title="Your Cart - Ayurveda Veda" description="Review and manage items in your cart before checkout." />
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-brand-forest font-serif text-4xl font-bold">Your Cart</h1>
            <div className="bg-brand-gold/10 text-brand-gold px-4 py-1 rounded-full font-bold text-sm">
              {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-brand-gold/20">
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="text-brand-gold w-10 h-10" />
              </div>
              <h2 className="text-brand-forest font-serif text-2xl font-bold mb-4">Your cart is currently empty</h2>
              <p className="text-brand-black/60 mb-8 max-w-sm mx-auto">
                Discover our premium Ayurvedic formulations and start your journey towards holistic wellness.
              </p>
              <Link to="/products">
                <Button className="bg-brand-forest text-brand-gold hover:bg-brand-forest/90 px-10 py-6 rounded-full font-bold">
                  Browse Apothecary
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-6 shadow-md border border-brand-gold/10 flex gap-6 animate-fade-in group">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-brand-gold/10 flex items-center justify-center p-2">
                      <img
                        src={productImageMap[item.id] || item.image}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/products/omega-3-front.png'; }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">{item.category}</span>
                          <h3 className="text-brand-forest font-serif text-xl font-bold line-clamp-1">{item.name}</h3>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-brand-black/30 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-brand-gold/30 rounded-lg p-1 bg-brand-cream/50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-brand-gold transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-brand-forest">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-brand-gold transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-brand-gold font-bold text-lg">₹{item.price * item.quantity}</p>
                          <p className="text-[10px] text-brand-black/40 uppercase">₹{item.price} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link to="/products" className="inline-flex items-center text-brand-forest hover:text-brand-gold transition-colors font-bold mt-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-brand-forest text-brand-cream rounded-3xl p-8 shadow-2xl sticky top-32">
                  <h3 className="font-serif text-2xl font-bold mb-8 border-b border-brand-gold/30 pb-4">Order Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between opacity-80">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between opacity-80">
                      <span>Shipping</span>
                      <span className="text-brand-gold">FREE</span>
                    </div>
                    <div className="flex justify-between opacity-80">
                      <span>GST</span>
                      <span>Included</span>
                    </div>
                    <div className="pt-4 border-t border-brand-gold/30 flex justify-between items-end">
                      <span className="font-bold text-xl">Total</span>
                      <div className="text-right">
                        <span className="text-brand-gold text-3xl font-bold">₹{cartTotal}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-brand-gold hover:bg-brand-goldDark text-brand-black font-bold py-8 text-xl rounded-2xl transition-all hover:scale-[1.02]"
                  >
                    Checkout Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <p className="text-[10px] text-center text-brand-cream/40 uppercase tracking-widest mt-6">
                    Direct Secure Payments • 100% Authentic
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
