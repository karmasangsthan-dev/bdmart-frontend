import Head from "next/head";
import Header from "./Shared/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, setCart } from "../features/auth/authSlice";
import Script from "next/script";
import Link from "next/link";
import Footer from "./Shared/Footer/Footer";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useSetCartMutation } from "../features/auth/authApi";

const Layout = ({ children, title = "Bangladesh Mart" }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const [token, setToken] = useState("");
  const [cartArray, setCartArray] = useState([]);
  const invalid = router.pathname === "/shop";
  const invalidURL = "/shop" || "/profile";

  // const { user, isLoading } = useSelector((state) => state?.auth);
  // const [setProductCart, { data, isSuccess, isError }] = useSetCartMutation({
  //   token,
  // });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // setToken(token);
    dispatch(fetchUser(token));
  }, [dispatch]);

  // useEffect(() => {
  //   const localCart = localStorage.getItem("cartProducts");
  //   if (localCart && !user?.email) {
  //     const cart = JSON.parse(localCart);
  //     setCartArray(cart);
  //     dispatch(setCart(cart));
  //   }
  // }, [user?.email, isLoading]);

  // useEffect(() => {
  //   const localCart = localStorage.getItem("cartProducts");
  //   if (localCart && user?.email) {
  //     const cart = JSON.parse(localCart);
  //     setCartArray(cart);
  //   }
  // }, [user?.email]);
  // useEffect(() => {
  //   if (user?.email && cartArray?.length && token) {
  //     const cartProducts = cartArray.map((product) => {
  //       return { _id: product?.product?._id, quantity: product?.quantity };
  //     });
  //     setProductCart({
  //       token,
  //       cartProducts,
  //       userId: user?._id,
  //     });
  //   }

  //   if (isSuccess) {
  //     localStorage.removeItem("cartProducts");
  //   }
  // }, [user?.email, cartArray]);

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
