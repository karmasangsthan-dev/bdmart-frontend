import Head from "next/head";
import Header from "./Shared/Header/Header";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../features/auth/authSlice";
import Script from "next/script";

import { useRouter } from "next/router";

import { setCart, setCartProducts } from "../features/cart/cartSlice";
import { useGetCartProductsMutation } from "../features/product/productApi";

import MobileBottomNav from "./Shared/Header/MobileBottomNav";

const Layout = ({ children, title = "Bangladesh Mart" }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [getCartProducts, { data, isLoading, isSuccess }] =
    useGetCartProductsMutation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    dispatch(fetchUser(token));
  }, [dispatch]);

  useEffect(() => {
    const cartProducts = localStorage.getItem("cartProducts");
    if (cartProducts) {
      const cart = JSON.parse(localStorage.getItem("cartProducts"));
      dispatch(setCart(cart));
      getCartProducts(cart);
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(setCartProducts(data?.data));
  }, [data?.data]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Script
        src="https://kit.fontawesome.com/a3939c0da5.js"
        crossOrigin="anonymous"
      ></Script>

      <Header />

      <main>{children}</main>
      <MobileBottomNav />
    </>
  );
};

export default Layout;
