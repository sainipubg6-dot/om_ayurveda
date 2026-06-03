import dotenv from 'dotenv';
dotenv.config();

import Razorpay from 'razorpay';

async function test() {
  try {
    const key_id = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    
    console.log("Keys available:", { key_id, key_secret: key_secret ? "Exists" : "Missing" });

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: "100",
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("Success:", order);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
