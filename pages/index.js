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

export default function Home({ data }) {
  const { locale } = useRouter();
  const t = locale === "en" ? en : bn;

  return (
    <Layout>
      <Banner />
      <LandingImage />
      <BestSelling t={t} />
      <ShopDepartments t={t} />
      <Discount t={t} />
      <JustForYou t={t} />
      <Footer />
    </Layout>
  );
}
