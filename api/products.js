export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const WC_ROOT_URL = process.env.VITE_WC_ROOT_URL || process.env.WC_ROOT_URL;
    const WC_CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY || process.env.WC_CONSUMER_KEY;
    const WC_CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET || process.env.WC_CONSUMER_SECRET;

    if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !WC_ROOT_URL) {
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const authParams = `consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`;
    const separator = WC_ROOT_URL.includes('?') ? '&' : '?';
    const url = `${WC_ROOT_URL}/wp-json/wc/v3/products${separator}${authParams}&per_page=100`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Ayurveda-Veda-Serverless'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const products = await response.json();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Something went wrong' });
  }
}
