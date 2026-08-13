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
    if (response.ok) {
      return await response.json();
    }
    console.warn(`Local API endpoint /api/products failed (${response.status}). Trying direct browser fallback...`);
  } catch (error) {
    console.warn('Error fetching from local API, trying direct browser fallback:', error);
  }

  // Direct client-side browser fetch fallback to WooCommerce (bypasses Vercel server-side CDN block)
  try {
    const rootUrl = process.env.NEXT_PUBLIC_WC_ROOT_URL || 'https://green-donkey-647181.hostingersite.com';
    const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || 'ck_3fe8804712cbf2348a272f13436710eccc9f64b2';
    const consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || 'cs_c370625b7e170677e7d1c743f1089c37b84ebb70';

    if (rootUrl && consumerKey && consumerSecret) {
      const authParams = `consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
      const separator = rootUrl.includes('?') ? '&' : '?';
      const url = `${rootUrl}/wp-json/wc/v3/products${separator}${authParams}&per_page=100`;

      const directRes = await fetch(url);
      if (directRes.ok) {
        console.log('Successfully fetched products directly from WooCommerce in browser.');
        return await directRes.json();
      }
    }
  } catch (directError) {
    console.error('Failed direct WooCommerce browser fetch fallback:', directError);
  }

  return [];
};

export const useWCProducts = () => {
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // 1. Instantly load from cache to make the page load feel instant (0ms lag)
      const cachedData = localStorage.getItem('wc_products_cache');
      if (cachedData) {
        setProducts(JSON.parse(cachedData));
        setLoading(false);
      }

      try {
        // 2. Fetch fresh products from WooCommerce in the background
        const data = await fetchWCProducts();
        
        if (data && data.length > 0) {
          setProducts(data);
          localStorage.setItem('wc_products_cache', JSON.stringify(data));
          localStorage.setItem('wc_products_cache_time', Date.now().toString());
        }
      } catch (error) {
        console.error('Background WooCommerce sync error:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { products, loading };
};


