"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Seo title="Your Cart - Ayurveda Veda" description="Review and manage items in your cart before checkout." />
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-brand-forest font-serif text-3xl md:text-4xl font-bold">Your Cart</h1>
            <span className="bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-full text-xs font-bold border border-brand-gold/30">
              {cart.length} Items
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-16 text-center max-w-2xl mx-auto border border-brand-gold/10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-cream rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="text-brand-gold w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-brand-forest font-serif text-xl md:text-2xl font-bold mb-4">Your cart is currently empty</h2>
              <p className="text-brand-black/60 mb-8 max-w-sm mx-auto">
                Discover our premium Ayurvedic formulations and start your journey towards holistic wellness.
              </p>
              <Button 
                className="bg-brand-forest text-brand-gold hover:bg-brand-forest/90 font-bold px-8 py-6 rounded-full"
                onClick={() => navigate('/products')}
              >
                Browse Apothecary
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white p-4 md:p-6 rounded-[1.5rem] shadow-lg flex items-center gap-4 border border-brand-gold/5">
                    <img src={item.image} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-brand-forest font-serif font-bold text-sm md:text-lg truncate">{item.name}</h3>
                      <p className="text-brand-gold font-bold text-xs md:text-sm mt-1">₹{item.price}</p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-brand-gold/20 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 px-2 hover:bg-brand-cream text-brand-forest transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-brand-forest">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-brand-cream text-brand-forest transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full border-brand-gold/30 text-brand-forest hover:bg-brand-gold/5 font-bold py-6 rounded-2xl mt-4"
                  onClick={() => navigate('/products')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-brand-forest p-6 md:p-8 rounded-[2rem] shadow-xl text-brand-cream sticky top-24">
                  <h3 className="font-serif text-xl font-bold mb-6 border-b border-brand-gold/20 pb-4">Order Summary</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm opacity-80">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm opacity-80">
                      <span>Shipping</span>
                      <span className="text-brand-gold font-bold italic">FREE</span>
                    </div>
                    <div className="pt-4 border-t border-brand-gold/20 flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-serif text-2xl font-bold text-brand-gold">₹{totalPrice}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold py-7 text-lg rounded-full shadow-2xl transition-all active:scale-95 group"
                    onClick={() => navigate('/checkout')}
                  >
                    Checkout Now
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
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
