
import { NextRequest, NextResponse } from 'next/server';

import PaytmChecksum from 'paytmchecksum';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

let api;
function getWooCommerceApi() {
  if (!api) {
    api = new WooCommerceRestApi.default({
      url: process.env.NEXT_PUBLIC_WC_ROOT_URL || process.env.WC_ROOT_URL || 'https://green-donkey-647181.hostingersite.com',
      consumerKey: process.env.WC_CONSUMER_KEY || 'placeholder_key',
      consumerSecret: process.env.WC_CONSUMER_SECRET || 'placeholder_secret',
      version: 'wc/v3'
    });
  }
  return api;
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { paytmResponse, wcOrderData } = req.body;
  const merchantKey = process.env.PAYTM_MERCHANT_KEY;

  if (!paytmResponse || !paytmResponse.ORDERID) {
    return res.status(400).json({ message: 'Invalid Paytm response' });
  }

  // Verify Checksum
  const paytmChecksum = paytmResponse.CHECKSUMHASH;
  delete paytmResponse.CHECKSUMHASH; // Checksum is verified against data without CHECKSUMHASH

  const isVerifySignature = PaytmChecksum.verifySignature(paytmResponse, merchantKey, paytmChecksum);

  if (isVerifySignature && paytmResponse.STATUS === 'TXN_SUCCESS') {
    try {
      // Payment verified, create WooCommerce order
      const response = await getWooCommerceApi().post('orders', wcOrderData);
      res.status(200).json({ success: true, order: response.data });
    } catch (wcError) {
      console.error('WooCommerce Order Error:', wcError);
      res.status(500).json({ success: false, message: 'Payment verified but order creation failed' });
    }
  } else {
    console.error("Checksum Mismatched or Transaction Failed");
    res.status(400).json({ success: false, message: 'Transaction failed or signature mismatch' });
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
