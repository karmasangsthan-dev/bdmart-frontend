import Head from "next/head";
import Header from "./Shared/Header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../features/auth/authSlice";
import Script from "next/script";
import Link from "next/link";
import Footer from "./Shared/Footer/Footer";

const Layout = ({ children, title = "Bangladesh Mart" }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    dispatch(fetchUser(token));
  }, [dispatch]);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Script
        src="https://kit.fontawesome.com/a3939c0da5.js"
        crossorigin="anonymous"
      ></Script>

      <Header />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
