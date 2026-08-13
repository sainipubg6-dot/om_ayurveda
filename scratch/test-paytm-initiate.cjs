const PaytmChecksum = require('paytmchecksum');

const mid = "rWeHvI80141494691809";
const merchantKey = "Lby@BaYKbh@OeYLN";
const website = "WEBSTAGING";
const orderId = `ORDER_${Date.now()}`;
const amount = "100";
const host = "securestage.paytmpayments.com";

const paytmParams = {
  body: {
    requestType: "Payment",
    mid: mid,
    websiteName: website,
    orderId: orderId,
    callbackUrl: `https://www.omayurveda.in/api/paytm-callback`,
    txnAmount: {
      value: amount,
      currency: "INR",
    },
    userInfo: {
      custId: "CUST_TEST",
    },
  }
};

PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), merchantKey).then(checksum => {
  paytmParams.head = {
    signature: checksum
  };

  const post_data = JSON.stringify(paytmParams);

  console.log("Sending request to Paytm...");
  fetch(`https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': post_data.length
    },
    body: post_data
  }).then(res => res.json()).then(data => {
    console.log("PAYTM RESPONSE: ", JSON.stringify(data, null, 2));
  }).catch(err => {
    console.error("Error connecting to Paytm: ", err);
  });
});
