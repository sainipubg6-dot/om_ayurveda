
import { NextRequest, NextResponse } from 'next/server';

import PaytmChecksum from 'paytmchecksum';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, custId = 'CUST_001', currency = 'INR' } = req.body;

  const paytmParams = {};

  const orderId = `ORDER_${Date.now()}`;
  const mid = process.env.NEXT_PUBLIC_PAYTM_MID || process.env.PAYTM_MID;
  const merchantKey = process.env.PAYTM_MERCHANT_KEY;
  const website = process.env.PAYTM_WEBSITE || 'WEBSTAGING';

    try {
      const isProduction = process.env.PAYTM_WEBSITE === 'DEFAULT';
      const host = isProduction ? 'secure.paytmpayments.com' : 'securestage.paytmpayments.com';

    const reqProtocol = req.headers['x-forwarded-proto'] || 'https';
    const reqHost = req.headers.host || 'localhost:3001';
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || `${reqProtocol}://${reqHost}`;

    paytmParams.body = {
      requestType: "Payment",
      mid: mid,
      websiteName: website,
      orderId: orderId,
      callbackUrl: `${baseUrl}/api/paytm-callback`,
      txnAmount: {
        value: amount.toString(), // e.g. "1.00"
        currency: currency,
      },
      userInfo: {
        custId: custId,
      },
    };

    console.log("PAYTM PARAMS BODY: ", paytmParams.body);
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      merchantKey
    );

    paytmParams.head = {
      signature: checksum
    };

    const post_data = JSON.stringify(paytmParams);

    const response = await fetch(`https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': post_data.length
      },
      body: post_data
    });

    const data = await response.json();
    
    if (data.body && data.body.resultInfo && data.body.resultInfo.resultStatus === "S") {
      res.status(200).json({
        txnToken: data.body.txnToken,
        orderId: orderId,
        mid: mid,
        amount: amount
      });
    } else {
      console.error("Paytm initiateTransaction error: ", data);
      res.status(500).json({ message: data.body?.resultInfo?.resultMsg || 'Error initiating transaction' });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message || 'Server error' });
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
