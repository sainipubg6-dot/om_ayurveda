import fs from 'fs';
import path from 'path';

const url = "https://green-donkey-647181.hostingersite.com/wp-json/wc/v3/products?consumer_key=ck_3fe8804712cbf2348a272f13436710eccc9f64b2&consumer_secret=cs_c370625b7e170677e7d1c743f1089c37b84ebb70&per_page=100";

console.log("Fetching WooCommerce products in Node...");
fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-overflow:;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
})
.then(res => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
})
.then(data => {
  const filePath = path.join(process.cwd(), 'src', 'themes', 'products-fallback.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully saved ${data.length} products to products-fallback.json!`);
})
.catch(err => {
  console.error("Fetch failed: ", err);
});
