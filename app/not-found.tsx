import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ShoppingBag, PhoneCall } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-cream px-4">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-brand-gold font-serif text-6xl md:text-8xl font-bold mb-4">404</h1>
        <h2 className="text-brand-forest font-serif text-2xl md:text-3xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-brand-black/70 mb-8 leading-relaxed">
          We couldn't find the page you're looking for. It might have been moved, or the URL might be incorrect.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full bg-brand-forest hover:bg-brand-forest/90 text-white rounded-xl">
              <Home className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full border-brand-gold text-brand-gold hover:bg-brand-gold/10 rounded-xl">
              <ShoppingBag className="w-4 h-4 mr-2" /> Our Products
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="w-full border-brand-forest text-brand-forest hover:bg-brand-forest/10 rounded-xl">
              <PhoneCall className="w-4 h-4 mr-2" /> Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
