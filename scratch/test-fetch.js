const WC_ROOT_URL = 'https://green-donkey-647181.hostingersite.com';
const WC_CONSUMER_KEY = 'ck_3fe8804712cbf2348a272f13436710eccc9f64b2';
const WC_CONSUMER_SECRET = 'cs_c370625b7e170677e7d1c743f1089c37b84ebb70';

async function testBrowserHeaders() {
  const url = `${WC_ROOT_URL}/wp-json/wc/v3/products?consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}&per_page=100`;
  console.log('Testing with Browser Spoofing Headers...');
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1'
      }
    });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body snippet:', text.substring(0, 500));
  } catch (err) {
    console.error('Error:', err);
  }
}

testBrowserHeaders();
