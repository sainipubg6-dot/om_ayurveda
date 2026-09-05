export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price?: string;
  on_sale?: boolean;
  description: string;
  short_description: string;
  images: Array<{ src: string }>;
  categories: Array<{ name: string }>;
}

export const getWCProductsServer = async (): Promise<WCProduct[]> => {
  try {
    const rootUrl = process.env.NEXT_PUBLIC_WC_ROOT_URL || process.env.WC_ROOT_URL || 'https://green-donkey-647181.hostingersite.com';
    const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || process.env.WC_CONSUMER_KEY || 'ck_3fe8804712cbf2348a272f13436710eccc9f64b2';
    const consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || process.env.WC_CONSUMER_SECRET || 'cs_c370625b7e170677e7d1c743f1089c37b84ebb70';

    if (rootUrl && consumerKey && consumerSecret) {
      const authParams = `consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
      const separator = rootUrl.includes('?') ? '&' : '?';
      const url = `${rootUrl}/wp-json/wc/v3/products${separator}${authParams}&per_page=100`;

      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        console.warn(`Server fetch failed with status ${response.status}. Hostinger Bot Protection might be blocking Vercel/Node IPs.`);
      }
    }
  } catch (error) {
    console.error('Server fetch error:', error);
  }

  // Fallback to local cache if API fails
  try {
    const fs = await import('fs');
    const path = await import('path');
    const fallbackPath = path.join(process.cwd(), 'src', 'themes', 'products-fallback.json');
    if (fs.existsSync(fallbackPath)) {
      const fallbackData = fs.readFileSync(fallbackPath, 'utf8');
      return JSON.parse(fallbackData);
    }
  } catch (fallbackError) {
    console.error('Fallback read error:', fallbackError);
  }

  return [];
};
