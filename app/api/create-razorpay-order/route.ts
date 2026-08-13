
import { NextRequest, NextResponse } from 'next/server';

import Razorpay from 'razorpay';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, currency = 'INR' } = req.body;

  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount.toString(), // amount in smallest currency unit
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ message: 'Some error occured' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Something went wrong' });
  }
}


export async function POST(request: NextRequest) {
  // Mock res for vercel function signature
  let responseData = null;
  let responseStatus = 200;
  
  const res = {
    status: (s) => { responseStatus = s; return res; },
    json: (d) => { responseData = d; },
    send: (d) => { responseData = d; },
    redirect: (url) => { responseData = { redirect: url }; responseStatus = 302; }
  };
  
  // Parse NextRequest to Vercel Req
  const req = {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    query: Object.fromEntries(new URL(request.url).searchParams),
    body: await request.json().catch(() => ({}))
  };
  
  await handler(req, res);
  
  if (responseStatus === 302) {
    return NextResponse.redirect(responseData.redirect);
  }
  
  return NextResponse.json(responseData, { status: responseStatus });
}
