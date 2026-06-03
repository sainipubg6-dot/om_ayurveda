import { useEffect, useState } from 'react';

// WooCommerce API calls are now proxied through secure serverless functions


export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  short_description: string;
  images: Array<{ src: string }>;
  categories: Array<{ name: string }>;
}

export const fetchWCProducts = async (): Promise<WCProduct[]> => {
  try {
    const response = await fetch('/api/products');
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from API:', error);
    return [];
  }
};

export const useWCProducts = () => {
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 1. Check Cache first
        const cachedData = localStorage.getItem('wc_products_cache');
        const cachedTime = localStorage.getItem('wc_products_cache_time');
        const now = Date.now();
        
        // Cache for 10 minutes (600,000 ms)
        if (cachedData && cachedTime && (now - parseInt(cachedTime) < 600000)) {
          setProducts(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        // 2. If no cache or expired, fetch from API
        const data = await fetchWCProducts();
        
        if (data && data.length > 0) {
          setProducts(data);
          localStorage.setItem('wc_products_cache', JSON.stringify(data));
          localStorage.setItem('wc_products_cache_time', now.toString());
        } else if (cachedData) {
          // Fallback to old cache if fetch fails (e.g. temporary block)
          setProducts(JSON.parse(cachedData));
        }
      } catch (error) {
        console.error('Cache/Load Error:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { products, loading };
};


