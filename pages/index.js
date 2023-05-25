import Head from "next/head";
import Banner from "../components/HomePage/Banner/Banner";
import BestSelling from "../components/HomePage/BestSelling/BestSelling";
import LandingImage from "../components/HomePage/LandingImage/LandingImage";
import ShopDepartments from "../components/HomePage/Department/ShopDepartments";
import Layout from "../components/Layout";
import Footer from "../components/Shared/Footer/Footer";
import Discount from "../components/HomePage/Discount/Discount";
import JustForYou from "../components/HomePage/JustForYou/JustForYou";
export default function Home() {
  return (
    <Layout>
      <Banner />
      <LandingImage />
      <BestSelling />
      <ShopDepartments />
      <Discount></Discount>
      <JustForYou></JustForYou>
      <Footer></Footer>
    </Layout>
  );
}
