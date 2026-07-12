import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import dotenv from 'dotenv';
dotenv.config();

async function testWcApi() {
  const rootUrl = process.env.VITE_WC_ROOT_URL || process.env.WC_ROOT_URL;
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;
  
  const api = new WooCommerceRestApi.default({
    url: rootUrl,
    consumerKey: key,
    consumerSecret: secret,
    version: "wc/v3"
  });

  try {
    const response = await api.get("products", { per_page: 1 });
    console.log("Success! Status:", response.status);
  } catch (error) {
    console.error("Error status:", error.response?.status);
    console.log("Error body:", error.response?.data?.substring?.(0, 500) || error.message);
  }
}

testWcApi();
