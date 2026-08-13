
import { NextRequest, NextResponse } from 'next/server';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const WC_ROOT_URL = process.env.NEXT_PUBLIC_WC_ROOT_URL || process.env.NEXT_PUBLIC_WC_ROOT_URL || process.env.WC_ROOT_URL;
    const WC_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || process.env.WC_CONSUMER_KEY;
    const WC_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || process.env.WC_CONSUMER_SECRET;

    if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !WC_ROOT_URL) {
      return res.status(500).json({ message: 'Server configuration error' });
    }

    let products = null;
    try {
      const authParams = `consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`;
      const separator = WC_ROOT_URL.includes('?') ? '&' : '?';
      const url = `${WC_ROOT_URL}/wp-json/wc/v3/products${separator}${authParams}&per_page=100`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      if (response.ok) {
        products = await response.json();
      } else {
        console.warn(`WooCommerce API returned status ${response.status}. Trying local fallback cache.`);
      }
    } catch (fetchError) {
      console.error('Error fetching from WooCommerce API:', fetchError);
    }

    // Fallback cache if API fails (useful for local development behind firewalls)
    if (!products) {
      const fs = require('fs');
      const path = require('path');
      const fallbackPath = path.join(process.cwd(), 'src', 'themes', 'products-fallback.json');
      
      if (fs.existsSync(fallbackPath)) {
        try {
          const fallbackData = fs.readFileSync(fallbackPath, 'utf8');
          products = JSON.parse(fallbackData);
          console.log('Successfully loaded products from local fallback cache.');
        } catch (jsonError) {
          console.error('Error parsing local fallback cache:', jsonError);
        }
      }
    }

    if (!products) {
      return res.status(500).json({ message: 'Failed to fetch products and no fallback cache available' });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Something went wrong' });
  }
}


export async function GET(request: NextRequest) {
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
