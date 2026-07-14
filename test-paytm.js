
import PaytmChecksum from 'paytmchecksum';
import dotenv from 'dotenv';
dotenv.config();

async function testPaytm() {
  const mid = (process.env.VITE_PAYTM_MID || "").trim();
  const merchantKey = (process.env.PAYTM_MERCHANT_KEY || "").trim();
  const orderId = `ORDER_${Date.now()}`;
  
  console.log(`MID length: ${mid.length}, Key length: ${merchantKey.length}`);
  
  const paytmParams = {
    body: {
      requestType: "Payment",
      mid: mid,
      websiteName: "DEFAULT",
      orderId: orderId,
      callbackUrl: `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${orderId}`,
      industryType: "Retail",
      txnAmount: {
        value: "10.00",
        currency: "INR",
      },
      userInfo: {
        custId: "CUST_001",
      },
    }
  };

  const checksum = await PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    merchantKey
  );
  
  paytmParams.head = {
    signature: checksum,
    channelId: "WEB" // Sometimes required in header or body
  };
  
  const post_data = JSON.stringify(paytmParams);

  console.log("Sending payload:", post_data);

  const response = await fetch(`https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': post_data.length
    },
    body: post_data
  });

  const data = await response.json();
  console.log("Response:", JSON.stringify(data, null, 2));
}

testPaytm();
