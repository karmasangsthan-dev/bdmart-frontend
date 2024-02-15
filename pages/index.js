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


export default function Home({ bestSelling,discount,category }) {
  const { locale } = useRouter();
  const t = locale === "en" ? en : bn;

  return (
    <Layout>
      <Banner />
      <CartFlottingButton></CartFlottingButton>
      <LandingImage />
      <BestSelling data={bestSelling} t={t} />
      <ShopDepartments data={category} t={t} />
      <Discount data={discount} t={t} />
      <JustForYou t={t} />
      <Footer />

      <Support></Support>
    </Layout>
  );
}


export async function getServerSideProps() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/products/section?section=bestSelling`
  const urlDisc = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/products/section?section=discount`
  const cate = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/category/category`
  const responseBestSelling = await fetch(url);
  const resDiscount = await fetch(urlDisc);
  const resCate = await fetch(cate);
  const bestSelling = await responseBestSelling.json();
  const discount = await resDiscount.json();
  const category = await resCate.json();
  return {
    props: { bestSelling, discount ,category},
  };
  // Return the data as props

}