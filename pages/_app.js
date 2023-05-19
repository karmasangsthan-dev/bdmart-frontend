import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import 'react-loading-skeleton/dist/skeleton.css'
import "slick-carousel/slick/slick-theme.css";
import "../styles/slider.css";
import "../styles/nav.css";
import "../styles/responsive.css";
import "../styles/signin.css";
import '../styles/profile.css'
import '../styles/loading.css'
import '../styles/productDetails.css'
import "../styles/notfoundpage.css"
import '../styles/cart.css'
import '../styles/discount.css'

import { Toaster } from "react-hot-toast";
import Providers from "../app/provider";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .catch(error => console.log('An error occurred while loading the Bootstrap script:', error));
  }, []);

  return (
    <Providers>
      <Component {...pageProps} />
      <Toaster />
    </Providers>
  );
}

