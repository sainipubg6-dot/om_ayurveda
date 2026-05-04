import { useEffect, useState } from 'react';

// Use relative path for local development proxy, otherwise use the env variable
const WC_ROOT_URL = (import.meta.env.DEV) 
  ? '' 
  : (import.meta.env.VITE_WC_ROOT_URL || '');
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

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
  if (!WC_ROOT_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) return [];

  try {
    const authParams = `consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`;
    const separator = `${WC_ROOT_URL}/wp-json/wc/v3/products`.includes('?') ? '&' : '?';
    const url = `${WC_ROOT_URL}/wp-json/wc/v3/products${separator}${authParams}&per_page=100`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error(`WooCommerce API Error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('WooCommerce: Network Error (Possible CORS issue or invalid URL)');
    } else {
      console.error('Error fetching from WooCommerce:', error);
    }
    return [];
  }
};

export const useWCProducts = () => {
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchWCProducts();
      setProducts(data);
      setLoading(false);
    };
    load();
  }, []);

  return { products, loading };
};

export const createWCOrder = async (orderData: any) => {
  if (!WC_ROOT_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) return null;

  try {
    const authParams = `consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`;
    const url = `${WC_ROOT_URL}/wp-json/wc/v3/orders?${authParams}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      console.error(`WooCommerce Order API Error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to create order: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('WooCommerce Order: Network Error (Possible CORS issue or invalid URL)');
    } else {
      console.error('Error creating order in WooCommerce:', error);
    }
    return null;
  }
};
