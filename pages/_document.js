import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://images.emojiterra.com/google/android-12l/512px/1f171.png"
        />

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
