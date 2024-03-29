import Head from 'next/head';
import Header from './Shared/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSeller, fetchUser } from '../features/auth/authSlice';
import Script from 'next/script';

import { useRouter } from 'next/router';

import { setCart, setCartProducts } from '../features/cart/cartSlice';
import { useGetCartProductsMutation } from '../features/product/productApi';

import MobileBottomNav from './Shared/Header/MobileBottomNav';

const Layout = ({ children, title = 'Bangladesh Mart', metaData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { seller } = useSelector((state) => state.auth);
  const [getCartProducts, { data, isLoading, isSuccess }] =
    useGetCartProductsMutation();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const sellerAccessToken = localStorage.getItem('sellerAccessToken');
    if (token) {
      dispatch(fetchUser(token));
    }
    if (sellerAccessToken) {
      dispatch(fetchSeller(sellerAccessToken));
    }
  }, [dispatch]);

  useEffect(() => {
    const cartProducts = localStorage.getItem('cartProducts');
    if (cartProducts) {
      const cart = JSON.parse(localStorage.getItem('cartProducts'));
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
        <meta name="title" content={metaData?.title} />
        <meta property="og:title" content={metaData?.title} />
        <meta property="og:description" content={metaData?.description} />
        <meta property="og:image" content={metaData?.thumbnail} />
      </Head>
      <Script
        src="https://kit.fontawesome.com/a3939c0da5.js"
        crossOrigin="anonymous"
      ></Script>

      <Header />

      <main>{children}</main>
      <div style={{ position: 'relative', zIndex: '99999' }}>
        <MobileBottomNav />
      </div>
    </>
  );
};

export default Layout;
