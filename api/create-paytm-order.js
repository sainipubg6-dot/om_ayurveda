import PaytmChecksum from 'paytmchecksum';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, custId = 'CUST_001', currency = 'INR' } = req.body;

  const paytmParams = {};

  const orderId = `ORDER_${Date.now()}`;
  const mid = process.env.VITE_PAYTM_MID || process.env.PAYTM_MID;
  const merchantKey = process.env.PAYTM_MERCHANT_KEY;
  const website = process.env.PAYTM_WEBSITE || 'WEBSTAGING';

    try {
      const isProduction = process.env.PAYTM_WEBSITE === 'DEFAULT';
    const host = isProduction ? 'secure.paytmpayments.com' : 'securestage.paytmpayments.com';

    paytmParams.body = {
      requestType: "Payment",
      mid: mid,
      websiteName: website,
      orderId: orderId,
      callbackUrl: `http://localhost:3001/api/paytm-callback`,
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
