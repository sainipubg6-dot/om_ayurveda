"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useCart } from '@/contexts/CartContext';


import { Button } from '@/components/ui/button';
import { ShieldCheck, Truck, CreditCard, ChevronRight, ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';

import { toast } from 'sonner';


const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<any>(null);
  const [progressText, setProgressText] = useState('We are securely connecting you to our payment partner.');

  React.useEffect(() => {
    let interval: any;
    if (isSubmitting) {
      const texts = [
        'We are securely connecting you to our payment partner.',
        'Encrypting your transaction data...',
        'Verifying connection with the bank...',
        'Almost there, initializing payment gateway...'
      ];
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setProgressText(texts[i]);
      }, 2000);
    } else {
      setProgressText('We are securely connecting you to our payment partner.');
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ayurveda_checkout_form');
      return saved ? JSON.parse(saved) : {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
      };
    }
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      localStorage.setItem('ayurveda_checkout_form', JSON.stringify(next));
      return next;
    });
  };

  const loadPaytm = () => {
    return new Promise((resolve) => {
      const existing = document.getElementById('paytm-script');
      if (!existing) {
        const script = document.createElement('script');
        script.id = 'paytm-script';
        const mid = process.env.NEXT_PUBLIC_PAYTM_MID || 'kQHYXq33356879397658';
        const isStaging = process.env.NEXT_PUBLIC_PAYTM_ENVIRONMENT === 'staging';
        const host = isStaging ? 'securestage.paytmpayments.com' : 'secure.paytmpayments.com';
        script.src = `https://${host}/merchantpgpui/checkoutjs/merchants/${mid}.js`;
        script.onload = () => resolve(true);
        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    });
  };

  const handleWhatsAppSync = () => {
    if (!lastOrderDetails) return;
    
    const storePhone = "917015001978"; 
    const message = `*NEW ORDER CONFIRMATION* %0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Total:* ₹${cartTotal}%0A` +
      `*Items:* ${cart.map(item => `${item.name} (x${item.quantity})`).join(', ')}%0A` +
      `*Address:* ${formData.address}, ${formData.city}%0A%0A` +
      `Please confirm my order!`;
    
    window.open(`https://wa.me/${storePhone}?text=${message}`, '_blank');
  };

  React.useEffect(() => {
    loadPaytm().catch(console.error);

    // Handle full-page redirect callback from Paytm
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get('STATUS');
    
    if (status === 'TXN_SUCCESS' && !orderSuccess) {
      setIsSubmitting(true);
      // Reconstruct the paytmResponse from query parameters
      const paytmResponse: any = {};
      searchParams.forEach((value, key) => {
        paytmResponse[key] = value;
      });

      const wcOrderData = {
        payment_method: 'paytm',
        payment_method_title: 'Paytm Wallet/UPI/Cards',
        set_paid: true,
        billing: {
          first_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address_1: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.pincode,
          country: 'IN'
        },
        line_items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      fetch('/api/verify-paytm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paytmResponse, wcOrderData })
      })
      .then(res => {
        if (!res.ok) throw new Error('Payment verification failed');
        return res.json();
      })
      .then(result => {
        setLastOrderDetails(result.order);
        setOrderSuccess(true);
        toast.success('Payment Successful!');
        clearCart();
        localStorage.removeItem('ayurveda_checkout_form');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      })
      .catch(err => {
        console.error("Order creation failed", err);
        toast.error("Payment verification failed or order sync failed.");
      })
      .finally(() => setIsSubmitting(false));
    }
  }, [cart, formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await loadPaytm();
      
      // 1. Create Order on Backend (Paytm)
      const orderRes = await fetch('/api/create-paytm-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: cartTotal,
          custId: `CUST_${Date.now()}`
        })
      });
      
      if (!orderRes.ok) throw new Error('Failed to create Paytm order');
      const orderData = await orderRes.json();
      
      // PAYTM CONFIGURATION
      const config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
            "orderId": orderData.orderId, 
            "token": orderData.txnToken, 
            "tokenType": "TXN_TOKEN",
            "amount": orderData.amount 
        },
        "handler": {
            "notifyMerchant": function(eventName: any, data: any){
                console.log("notifyMerchant handler function called");
                console.log("eventName => ",eventName);
                if (eventName === 'APP_CLOSED') {
                  setIsSubmitting(false);
                  
                  // Fire abandoned cart notification
                  fetch('/api/notify-abandoned', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      userDetails: {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email,
                        city: formData.city
                      },
                      cart: cart,
                      totalAmount: orderData.amount
                    })
                  }).catch(console.error);
                }
            },
            "transactionStatus": async function(data: any){
                console.log("payment status ", data);
                // @ts-ignore
                if(window.Paytm && window.Paytm.CheckoutJS) window.Paytm.CheckoutJS.close();
                
                try {
                  // Verify Payment & Create WC Order securely on backend
                  const verifyRes = await fetch('/api/verify-paytm-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      paytmResponse: data,
                      wcOrderData: {
                        payment_method: 'paytm',
                        payment_method_title: 'Paytm Wallet/UPI/Cards',
                        set_paid: true,
                        billing: {
                          first_name: formData.name,
                          email: formData.email,
                          phone: formData.phone,
                          address_1: formData.address,
                          city: formData.city,
                          postcode: formData.pincode,
                          country: 'IN'
                        },
                        line_items: cart.map(item => ({
                          product_id: item.id,
                          quantity: item.quantity
                        }))
                      }
                    })
                  });

                  if (!verifyRes.ok) throw new Error('Payment verification failed');
                  const result = await verifyRes.json();

                  setLastOrderDetails(result.order);
                  setOrderSuccess(true);
                  toast.success('Payment Successful!');
                  clearCart();
                } catch (wcErr) {
                  console.error("Order creation failed", wcErr);
                  toast.error("Payment received but order sync failed. Contact support.");
                }
            }
        }
      };

      if(window.Paytm && window.Paytm.CheckoutJS){
          // @ts-ignore
          window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
              // @ts-ignore
              window.Paytm.CheckoutJS.invoke();
          }).catch(function onError(error: any){
              console.log("error => ",error);
              toast.error('Could not initialize Paytm payment.');
              setIsSubmitting(false);
          });
      } else {
         toast.error('Could not initialize payment. Please check connection.');
         setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not initialize payment. Please check connection.');
      setIsSubmitting(false);
    }
  };

  // CART EMPTY CHECK (Must be before any early returns)
  const isPaymentCallback = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).has('STATUS') : false;
  React.useEffect(() => {
    if (cart.length === 0 && !orderSuccess && !isPaymentCallback) {
      router.push('/cart');
    }
  }, [cart.length, orderSuccess, router, isPaymentCallback]);

  if (cart.length === 0 && !orderSuccess && !isPaymentCallback) {
    return null;
  }

  // SUCCESS SCREEN
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col">
        
        <main className="flex-1 flex items-center justify-center p-6 pt-32">
          <div className="max-w-xl w-full bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl border border-brand-gold/10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="text-green-600 w-12 h-12" />
            </div>
            <h1 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold mb-4">Order Received!</h1>
            <p className="text-brand-black/60 mb-8 text-lg">Your healing journey begins today. We have received your order and a confirmation email has been sent to you.</p>

            {lastOrderDetails && (
              <div className="bg-brand-cream/40 border border-brand-gold/20 rounded-2xl p-6 text-left mb-8 shadow-sm">
                <h3 className="font-bold text-brand-forest text-xl mb-4 border-b border-brand-gold/10 pb-3">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-brand-black/70">Order ID:</span>
                    <span className="font-bold text-brand-forest text-lg">#{String(lastOrderDetails.id || lastOrderDetails.orderId || lastOrderDetails.ORDERID || Math.floor(Math.random() * 10000))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-brand-black/70">Confirmation sent to:</span>
                    <span className="font-medium text-brand-forest truncate max-w-[200px]">{String((lastOrderDetails.billing && lastOrderDetails.billing.email) || formData.email || 'your email')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-brand-black/70">Total Amount Paid:</span>
                    <span className="font-bold text-green-600 text-lg">₹{String(lastOrderDetails.total || lastOrderDetails.TXNAMOUNT || cartTotal || '0')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-brand-gold/10">
                    <span className="text-brand-black/70">Expected Delivery:</span>
                    <span className="font-bold text-brand-forest">5-7 working days</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <Button 
                onClick={handleWhatsAppSync}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 h-auto"
              >
                <MessageCircle className="w-5 h-5" />
                <div className="flex flex-col text-left">
                  <span>Sync with WhatsApp</span>
                  <span className="text-[10px] font-normal opacity-90">Get order updates & delivery notifications.</span>
                </div>
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push('/products')}
                className="w-full border-brand-gold/20 text-brand-forest hover:bg-brand-gold/5 font-bold py-6 text-lg rounded-2xl mt-4"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
        
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-brand-cream relative">
      {/* LOADING OVERLAY */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-forest/90 backdrop-blur-md">
          <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 text-center animate-in fade-in zoom-in duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-gold to-brand-forest"></div>
            <div className="w-16 h-16 border-4 border-brand-cream border-t-brand-forest rounded-full animate-spin mb-6"></div>
            <h3 className="text-2xl font-serif font-bold text-brand-forest mb-3">Processing Payment</h3>
            <p className="text-brand-black/70 text-sm leading-relaxed mb-4 transition-opacity duration-300 min-h-[40px]">
              {progressText}
            </p>
            <p className="text-xs text-brand-forest font-bold bg-brand-cream/50 px-3 py-1.5 rounded-full mb-4">Usually takes 5-10 seconds</p>
            <p className="text-brand-black/70 text-xs">
              <span className="font-bold text-red-500">Please do not close or refresh this window.</span>
            </p>
          </div>
        </div>
      )}

      
      

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Link href="/cart" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-forest hover:bg-brand-gold transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-brand-forest font-serif text-3xl md:text-4xl font-bold">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Forms */}
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-brand-gold/10">
                <h2 className="text-brand-forest font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 bg-brand-gold text-brand-black rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">Full Name <span className="text-red-500">*</span></label>
                    <input required name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">Email Address <span className="text-red-500">*</span></label>
                    <input required type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="your@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">Phone Number <span className="text-red-500">*</span></label>
                    <input required type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="+91 9999999999" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">City <span className="text-red-500">*</span></label>
                    <input required name="city" autoComplete="address-level2" value={formData.city} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">State <span className="text-red-500">*</span></label>
                    <input required name="state" autoComplete="address-level1" value={formData.state || ''} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="Maharashtra" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">Pincode <span className="text-red-500">*</span></label>
                    <input required type="text" name="pincode" autoComplete="postal-code" value={formData.pincode} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="400001" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">Street Address & Landmark <span className="text-red-500">*</span></label>
                    <textarea required name="address" autoComplete="street-address" value={formData.address} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors h-24 resize-none" placeholder="House No, Building, Street, Landmark..." />
                  </div>
                </div>
                
                <p className="text-xs text-brand-forest/60 mt-6 flex items-center justify-center gap-2 font-medium bg-brand-cream/30 py-3 rounded-xl border border-brand-gold/10">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  Your personal information is secure and never shared with third parties.
                </p>
              </div>
            </div>

            {/* Right: Summary & Pay */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-brand-forest text-brand-cream rounded-3xl p-8 shadow-2xl sticky top-32">
                <h3 className="font-serif text-2xl font-bold mb-6 border-b border-brand-gold/30 pb-4">Order Summary</h3>

                {/* Mini Cart Display */}
                <div className="space-y-4 mb-8 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate text-white">{item.name}</h4>
                        <p className="text-xs text-white/80">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-white text-base">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex justify-between font-bold text-xl items-center">
                    <span className="text-white">Final Amount</span>
                    <span className="text-white text-3xl">₹{cartTotal}</span>
                  </div>
                  <p className="text-white/80 text-xs">Tax included. Secure payment only.</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl">
                    <ShieldCheck className="text-brand-gold w-6 h-6 mt-1" />
                    <div>
                      <p className="font-bold text-white">100% Secure Payment</p>
                      <p className="text-xs text-white/80 mt-1">UPI, Credit/Debit Cards, Net Banking & Wallets accepted.</p>
                      <div className="flex gap-2 mt-3 items-center text-white/90">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded font-bold tracking-wider">UPI</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded font-bold tracking-wider">VISA</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded font-bold tracking-wider">Paytm</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-gold hover:bg-brand-goldDark text-brand-black font-bold py-8 text-xl rounded-2xl transition-all shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Pay & Complete Order'}
                  {!isSubmitting && <ChevronRight className="w-5 h-5 ml-2" />}
                </Button>

                <div className="flex flex-col items-center justify-center mt-8 space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center opacity-80 text-white">
                      <ShieldCheck className="w-5 h-5 mb-1 text-green-400" />
                      <span className="text-[8px] uppercase font-bold">256-bit SSL</span>
                    </div>
                    <div className="flex flex-col items-center opacity-80 text-white">
                      <Truck className="w-5 h-5 mb-1 text-blue-400" />
                      <span className="text-[8px] uppercase font-bold">Express</span>
                    </div>
                  </div>
                  <div className="w-full border-t border-brand-gold/20 pt-4 mt-2 text-center">
                    <p className="text-xs text-white/80 mb-1">Need help? Email us at</p>
                    <a href="mailto:support@ayurvedaveda.com" className="text-sm font-bold text-brand-gold hover:underline">support@ayurvedaveda.com</a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      
    </div>
  );
};

export default CheckoutPage;