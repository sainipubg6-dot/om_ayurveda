import React, { useState } from 'react';
import Seo from '@/components/Seo';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Truck, CreditCard, ChevronRight, ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { createWCOrder } from '@/lib/woocommerce';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const existing = document.getElementById('razorpay-script');
      if (!existing) {
        const script = document.createElement('script');
        script.id = 'razorpay-script';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    });
  };

  const handleWhatsAppSync = () => {
    if (!lastOrderDetails) return;
    
    const storePhone = "917015001978"; // Replace with your actual WhatsApp number
    const message = `*NEW ORDER CONFIRMATION* %0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Total:* ₹${cartTotal}%0A` +
      `*Items:* ${cart.map(item => `${item.name} (x${item.quantity})`).join(', ')}%0A` +
      `*Address:* ${formData.address}, ${formData.city}%0A%0A` +
      `Please confirm my order!`;
    
    window.open(`https://wa.me/${storePhone}?text=${message}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await loadRazorpay();
      
      // RAZORPAY CONFIGURATION
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', 
        amount: cartTotal * 100,
        currency: 'INR',
        name: 'Om Ayurveda',
        description: `Order for ${cart.length} items`,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone.replace(/[^0-9]/g, '')
        },
        handler: async function (response: any) {
          try {
            // Create Order in WooCommerce
            const wcOrder = await createWCOrder({
              payment_method: 'razorpay',
              payment_method_title: 'Razorpay Online',
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
            });

            setLastOrderDetails(wcOrder);
            setOrderSuccess(true);
            toast.success('Payment Successful!');
            clearCart();
          } catch (wcErr) {
            console.error("Order creation failed", wcErr);
            toast.error("Payment received but order sync failed. Contact support.");
          }
        },
        theme: {
          color: '#2D6A4F'
        }
      } as any;

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Could not initialize payment. Please check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 pt-32">
          <div className="max-w-xl w-full bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl border border-brand-gold/10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="text-green-600 w-12 h-12" />
            </div>
            <h1 className="text-brand-forest font-serif text-3xl md:text-5xl font-bold mb-4">Order Received!</h1>
            <p className="text-brand-black/60 mb-10 text-lg">Your healing journey begins today. We have received your order and are preparing your formulations.</p>
            
            <div className="space-y-4">
              <Button 
                onClick={handleWhatsAppSync}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-8 text-xl rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <MessageCircle className="w-6 h-6" />
                Sync with WhatsApp
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full border-brand-gold/20 text-brand-forest hover:bg-brand-gold/5 font-bold py-8 text-lg rounded-2xl"
              >
                Return to Home
              </Button>
            </div>
            <p className="mt-8 text-[10px] uppercase tracking-widest text-brand-black/30 font-bold">Please click the WhatsApp button to get instant updates</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // CART EMPTY CHECK (Moved after success check)
  if (cart.length === 0 && !orderSuccess) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <Seo title="Checkout - Ayurveda Veda" description="Complete your purchase of premium Ayurvedic products." />
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Link to="/cart" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-forest hover:bg-brand-gold transition-colors shadow-sm">
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
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="Harsh Vardhan" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="harsh@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="+91 70150 01978" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">City</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" placeholder="New Delhi" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-brand-forest uppercase tracking-widest pl-1">Delivery Address</label>
                    <textarea required name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-brand-cream/50 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors h-24" placeholder="House No, Street, Landmark..." />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Summary & Pay */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-brand-forest text-brand-cream rounded-3xl p-8 shadow-2xl sticky top-32">
                <h3 className="font-serif text-2xl font-bold mb-8 border-b border-brand-gold/30 pb-4">Payment</h3>

                <div className="space-y-4 mb-10">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Final Amount</span>
                    <span className="text-brand-gold">₹{cartTotal}</span>
                  </div>
                  <p className="text-brand-cream/40 text-xs">Tax included. Secure payment only.</p>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl">
                    <CreditCard className="text-brand-gold w-6 h-6 mt-1" />
                    <div>
                      <p className="font-bold">Prepaid Payment</p>
                      <p className="text-sm opacity-60">Redirects to secure payment gateway.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl">
                    <ShieldCheck className="text-brand-gold w-6 h-6 mt-1" />
                    <div>
                      <p className="font-bold">100% Secure</p>
                      <p className="text-sm opacity-60">Your data is encrypted.</p>
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

                <div className="flex items-center justify-center gap-6 mt-8">
                  <div className="flex flex-col items-center opacity-50">
                    <ShieldCheck className="w-5 h-5 mb-1" />
                    <span className="text-[8px] uppercase">Secured</span>
                  </div>
                  <div className="flex flex-col items-center opacity-50">
                    <Truck className="w-5 h-5 mb-1" />
                    <span className="text-[8px] uppercase">Express</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
