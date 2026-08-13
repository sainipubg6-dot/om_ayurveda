(()=>{var e={};e.id=603,e.ids=[603],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},71543:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>m,routeModule:()=>d,serverHooks:()=>h,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>u});var s={};r.r(s),r.d(s,{POST:()=>p,dynamic:()=>c});var o=r(55683),a=r(26812),n=r(44275),i=r(4850);let c="force-dynamic";async function p(e){try{let t=await e.formData(),r=Object.fromEntries(t.entries()),s=new URLSearchParams(r).toString(),o=e.headers.get("host")||"localhost:8080",a=process.env.NEXT_PUBLIC_FRONTEND_URL||`https://${o}`,n=`
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
            try {
              if (window.opener) {
                 window.opener.location.href = "${a}/checkout?" + "${s}";
                 window.close();
              } else {
                 window.top.location.href = "${a}/checkout?" + "${s}";
              }
            } catch(e) {
              window.top.location.href = "${a}/checkout?" + "${s}";
            }
          </script>
        </body>
      </html>
    `;return new Response(n,{headers:{"Content-Type":"text/html"}})}catch(e){return console.error(e),i.NextResponse.json({message:e.message||"Something went wrong"},{status:500})}}let d=new o.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/paytm-callback/route",pathname:"/api/paytm-callback",filename:"route",bundlePath:"app/api/paytm-callback/route"},resolvedPagePath:"D:\\MY Web apps\\Demo and template websites\\ayurveda veda\\app\\api\\paytm-callback\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:u,serverHooks:h}=d;function m(){return(0,n.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:u})}},37076:()=>{},73460:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[79,880],()=>r(71543));module.exports=s})();