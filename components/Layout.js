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

const Layout = ({ children, title = 'Bangladesh Mart' }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [getCartProducts, { data, isLoading, isSuccess }] =
    useGetCartProductsMutation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    dispatch(fetchUser(token));
    dispatch(fetchSeller(token));

    if (user?.email) {
      document.cookie =
        'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
