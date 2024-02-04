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


export default function Home({ bestSelling }) {
  const { locale } = useRouter();
  const t = locale === "en" ? en : bn;

  return (
    <Layout>
      <Banner />
      <CartFlottingButton></CartFlottingButton>
      <LandingImage />
      <BestSelling data={bestSelling} t={t} />
      <ShopDepartments t={t} />
      <Discount t={t} />
      <JustForYou t={t} />
      <Footer />

      <Support></Support>
    </Layout>
  );
}


export async function getServerSideProps() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/products/section?section=bestSelling`
  const responseBestSelling = await fetch(url);
  const bestSelling = await responseBestSelling.json();

  // Return the data as props
  return {
    props: { bestSelling },
  };
}