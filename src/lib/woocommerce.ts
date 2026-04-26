import { useEffect, useState } from 'react';

const WC_ROOT_URL = import.meta.env.VITE_WC_ROOT_URL || '';
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

export interface WCProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  short_description: string;
  images: Array<{ src: string }>;
  categories: Array<{ name: string }>;
}

export const fetchWCProducts = async (): Promise<WCProduct[]> => {
  if (!WC_ROOT_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) return [];

  try {
    const auth = btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`);
    const response = await fetch(`${WC_ROOT_URL}/wp-json/wc/v3/products?per_page=100`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching from WooCommerce:', error);
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
    const auth = btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`);
    const response = await fetch(`${WC_ROOT_URL}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) throw new Error('Failed to create order');
    return await response.json();
  } catch (error) {
    console.error('Error creating order in WooCommerce:', error);
    return null;
  }
};
