import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import MobileBottomNav from '../components/Shared/Header/MobileBottomNav';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://images.emojiterra.com/google/android-12l/512px/1f171.png"
        />

        <meta name="description" content="Welcome to Bangladesh Mart, your global online shopping destination! With a diverse selection of over 10 million products, enjoy exclusive discounts and deals available in Bangladesh, India, Saudi Arabia, the United States, ,the United Kingdom, the United Arab Emirates, and beyond. Experience the ease of cash on delivery (COD) options available in multiple countries" />

        <meta property="og:url" content="https://bangladeshmart.com.bd" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Online Shopping in Bangladesh: Order Now from Bangladeshmart.com.bd" />
        <meta
          property="og:description"
          content="Welcome to Bangladesh Mart, your global online shopping destination! With a diverse selection of over 10 million products, enjoy exclusive discounts and deals available in Bangladesh, India, Saudi Arabia, the United States, ,the United Kingdom, the United Arab Emirates, and beyond. Experience the ease of cash on delivery (COD) options available in multiple countries"
        />
        <meta
          property="og:image"
          content="https://bangladeshmart.com.bd/_ipx/w_256,q_75/%2Fimages%2Flogo2.jpg?url=%2Fimages%2Flogo2.jpg&w=256&q=75"
        />


        <meta property="og:site_name" content="Bangladesh Mart" />
        <meta name="google-site-verification" content="wqiPOEdNBB5jW2_BbXMgFaBjo60zf7x67kBmeSTZ1aw" />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"
          integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
