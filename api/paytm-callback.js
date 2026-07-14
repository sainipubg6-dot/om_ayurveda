export default async function handler(req, res) {
  const data = req.body || {};
  
  // URLSearchParams automatically encodes all the key-value pairs
  const qs = new URLSearchParams(data).toString();
  
  const reqProtocol = req.headers['x-forwarded-proto'] || 'https';
  const reqHost = req.headers.host || 'localhost:8080';
  const frontendUrl = process.env.VITE_FRONTEND_URL || `${reqProtocol}://${reqHost}`;

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <html>
      <head>
        <title>Processing Payment...</title>
        <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #fcf9f2; }
          .loader { border: 4px solid #f3f3f3; border-top: 4px solid #1c4f3a; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <div style="text-align: center;">
          <div class="loader" style="margin: 0 auto 20px;"></div>
          <h2 style="color: #1c4f3a;">Processing your payment...</h2>
          <p style="color: #666;">Please do not refresh or close this window.</p>
        </div>
        <script>
          // This script breaks out of any iframe/popup and redirects the main window back to the checkout page
          // with the payment status parameters.
          try {
            if (window.opener) {
               window.opener.location.href = "${frontendUrl}/checkout?" + "${qs}";
               window.close();
            } else {
               window.top.location.href = "${frontendUrl}/checkout?" + "${qs}";
            }
          } catch(e) {
            window.top.location.href = "${frontendUrl}/checkout?" + "${qs}";
          }
        </script>
      </body>
    </html>
  `);
}
