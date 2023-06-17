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
import { useUpdateVisitorMutation } from "../features/auth/authApi";
import FixedBottomNavigation from "../components/Shared/Header/MobileBottomNav";
import MobileBottomNav from "../components/Shared/Header/MobileBottomNav";

export default function Home({ data }) {
  const { locale } = useRouter();
  const t = locale === "en" ? en : bn;
  const [updateVisitor, { isSuccess, isError, error }] =
    useUpdateVisitorMutation();

  const recordVisitorData = async () => {
    try {
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = ipResponse.data.ip; // Retrieve the IP address from the response

      const geoIpResponse = await axios.get(
        `http://ip-api.com/json/${ipAddress}`
      );
      const country = geoIpResponse.data.country;
      const data = { ipAddress, country };

      await updateVisitor({ ipAddress, country });
    } catch (error) {
      console.error("Error recording visitor data:", error);
    }
  };
  // setInterval(recordVisitorData, 60000);

  return (
    <Layout>
      
      <Banner />
      <LandingImage />
      <BestSelling t={t} />
      <ShopDepartments t={t} />
      <Discount t={t} />
      <JustForYou t={t} />
      <Footer></Footer>
    </Layout>
  );
}
