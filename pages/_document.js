import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import MobileBottomNav from "../components/Shared/Header/MobileBottomNav";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://images.emojiterra.com/google/android-12l/512px/1f171.png"
        />
        <meta property="og:title" content="Bangladesh Mart" />
        <meta property="og:description" content="Discover a wide range of products at competitive prices on BangladeshMart, your one-stop online shopping destination. Browse through our extensive collection of electronics, fashion, home appliances, beauty products, and much more. Enjoy a seamless shopping experience with secure payments, fast delivery, and excellent customer service. Start shopping today and find great deals on your favorite brands at BangladeshMart." />
        <meta property="og:image" content="https://bangladeshmart.com.bd/_ipx/w_256,q_75/%2Fimages%2Flogo2.jpg?url=%2Fimages%2Flogo2.jpg&w=256&q=75" />
        <meta property="og:url" content="https://bangladeshmart.com.bd" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Bangladesh Mart" />

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"
          integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        ></script>
      </Head>
      <body>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
