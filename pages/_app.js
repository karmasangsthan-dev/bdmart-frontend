import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'cropperjs/dist/cropper.css';
import "slick-carousel/slick/slick.css";
import "react-loading-skeleton/dist/skeleton.css";
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
import '../styles/contactHeader.css';
import '../styles/order.css'
import '../styles/invoice.css'
// // ok 
import '../styles/contact.css'
import '../styles/footer.css'
import '../styles/seller.css'
import '../styles/shopdepartment.css'
import '../styles/mobileSignin.css'
import '../styles/productQuestions.css'
import '../styles/userDashboard.css'
import '../styles/checkout.css'
import '../styles/payment.css';
import '../styles/about.css';

import { Toaster } from "react-hot-toast";
import Providers from "../app/provider";
import { useEffect } from "react";
import OfflineNotifier from "../components/OfflineNotifier";
import NextNProgress from 'nextjs-progressbar';
const App = ({ Component, pageProps }) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((error) =>
      console.log(
        "An error occurred while loading the Bootstrap script:",
        error
      )
    );
  }, []);

  return (
    <Providers>
      <NextNProgress color="rgb(16 185 129/1)" options={{ trickleSpeed: 50, showSpinner: false }} />
      <Component {...pageProps} />
      <Toaster />
      <OfflineNotifier />
    </Providers>
  );
}

export default App;

