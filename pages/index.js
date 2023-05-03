import Head from "next/head";
import Banner from "../components/HomePage/Banner/Banner";
import BestSelling from "../components/HomePage/BestSelling/BestSelling";
import LandingImage from "../components/HomePage/LandingImage/LandingImage";
import ShopDepartments from "../components/HomePage/Department/ShopDepartments";

import Layout from "../components/Layout";
import Footer from "../components/Shared/Footer/Footer";

export async function getServerSideProps() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return {
    props: {
      data
    }
  };
}

export default function Home({data}) {
  return (
    <Layout>
      <Banner />
      {/* <LandingImage/> */}
      <BestSelling data={data} />
      <ShopDepartments />
      <Footer></Footer>
    </Layout>
  );
}
