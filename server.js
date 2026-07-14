import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Import API Handlers
import productsHandler from './api/products.js';
import createPaytmOrderHandler from './api/create-paytm-order.js';
import verifyPaytmPaymentHandler from './api/verify-paytm-payment.js';
import paytmCallbackHandler from './api/paytm-callback.js';

const app = express();
app.use(cors());
app.use(express.json());
// Middleware to parse URL-encoded bodies (important for Paytm POST redirects which use application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Helper to simulate Vercel req/res for Express
const vercelWrapper = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Routes
app.get('/api/products', vercelWrapper(productsHandler));
app.post('/api/create-paytm-order', vercelWrapper(createPaytmOrderHandler));
app.post('/api/verify-paytm-payment', vercelWrapper(verifyPaytmPaymentHandler));
app.post('/api/paytm-callback', vercelWrapper(paytmCallbackHandler));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Local API Server running on http://localhost:${PORT}`);
});
