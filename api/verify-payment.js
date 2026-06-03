import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, wcOrderData } = req.body;

  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Create signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Payment is valid! Now create the WooCommerce order securely from the backend
    const WC_ROOT_URL = process.env.VITE_WC_ROOT_URL || process.env.WC_ROOT_URL;
    const WC_CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY || process.env.WC_CONSUMER_KEY;
    const WC_CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET || process.env.WC_CONSUMER_SECRET;

    if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !WC_ROOT_URL) {
      console.error("Missing WooCommerce credentials in backend");
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const authParams = `consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`;
    const separator = WC_ROOT_URL.includes('?') ? '&' : '?';
    const url = `${WC_ROOT_URL}/wp-json/wc/v3/orders${separator}${authParams}`;

    const wcResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Ayurveda-Veda-Serverless'
      },
      body: JSON.stringify(wcOrderData)
    });

    if (!wcResponse.ok) {
      console.error(`WooCommerce API Error: ${wcResponse.status} ${wcResponse.statusText}`);
      throw new Error(`Failed to create order: ${wcResponse.status}`);
    }

    const wcOrder = await wcResponse.json();

    res.json({ success: true, order: wcOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Something went wrong' });
  }
}
