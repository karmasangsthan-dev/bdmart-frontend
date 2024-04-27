import Head from "next/head";
import Banner from "../components/HomePage/Banner/Banner";
import BestSelling from "../components/HomePage/BestSelling/BestSelling";
import LandingImage from "../components/HomePage/LandingImage/LandingImage";
import ShopDepartments from "../components/HomePage/Department/ShopDepartments";
import Layout from "../components/Layout";
import Footer from "../components/Shared/Footer/Footer";
import Discount from "../components/HomePage/Discount/Discount";
import JustForYou from "../components/HomePage/JustForYou/JustForYou";
import { useRouter } from "next/router";
import { en } from "../locales/en";
import { bn } from "../locales/bn";
import axios from "axios";
import FixedBottomNavigation from "../components/Shared/Header/MobileBottomNav";
import MobileBottomNav from "../components/Shared/Header/MobileBottomNav";
import CartFlottingButton from "../components/Cart/CartFlottingButton";
import Support from "../components/Support/Support";
import toast from "react-hot-toast";


export default function Home({ bestSelling, discount, category, error }) {
  const { locale } = useRouter();
  const t = locale === "en" ? en : bn;
  if (error) {
    toast.error('An error occurred. Please refresh or try again later.')
  }
  return (
    <Layout>
      <Banner />
      <CartFlottingButton></CartFlottingButton>
      <LandingImage />
      <BestSelling data={bestSelling} error={error} t={t} />
      <ShopDepartments data={category} t={t} />
      <Discount data={discount} t={t} />
      <JustForYou t={t} />
      <Footer />

      <Support></Support>
    </Layout>
  );
}


export async function getServerSideProps() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/products/section?section=bestSelling`;
    const urlDisc = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/products/section?section=discount`;
    const cate = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/category/category`;

    const [responseBestSelling, resDiscount, resCate] = await Promise.all([
      fetch(url),
      fetch(urlDisc),
      fetch(cate)
    ]);

    // Check if any of the responses has an error status
    if (!responseBestSelling.ok || !resDiscount.ok || !resCate.ok) {
      throw new Error('Failed to fetch data');
    }

    const [bestSelling, discount, category] = await Promise.all([
      responseBestSelling.json(),
      resDiscount.json(),
      resCate.json()
    ]);

    return {
      props: { bestSelling, discount, category }
    };
  } catch (error) {
    return {
      props: { error: error.message }
    };
  }
}