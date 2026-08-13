import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, wcOrderData } = await request.json();
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.error("Missing RAZORPAY_KEY_SECRET in backend");
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    // Create signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });
    }

    // Payment is valid! Now create the WooCommerce order securely from the backend
    const WC_ROOT_URL = process.env.NEXT_PUBLIC_WC_ROOT_URL || process.env.WC_ROOT_URL;
    const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
    const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

    if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !WC_ROOT_URL) {
      console.error("Missing WooCommerce credentials in backend");
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
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
    return NextResponse.json({ success: true, order: wcOrder });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || 'Something went wrong' }, { status: 500 });
  }
}
