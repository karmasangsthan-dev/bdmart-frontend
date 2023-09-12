import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { FaGooglePlusG, FaFacebookF } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Header from '../components/Shared/Header/Header';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import {
  useLoginMutation,
  useSocialLoginMutation,
} from '../features/auth/authApi';
import { setUser } from '../features/auth/authSlice';
import auth from '../firebase.init';
import GoogleLogin from '../components/Shared/SocialLogin/GoogleLogin';
import Layout from '../components/Layout';

const signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [login, { data, isSuccess, isLoading, isError, error }] = useLoginMutation();
  const { query } = router;
  const { redirect } = query;
  const dispatch = useDispatch();

  console.log({redirect})

  const handleCreateCustomerAccount = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'login' });
    }
    if (isSuccess) {
      localStorage.setItem('accessToken', data.token);
      toast.success('Success', { id: 'login' });
      router.push(redirect || '/');
      dispatch(setUser(data?.data));
    }
    if (isError) {
      toast.error(error?.data?.error, { id: 'login' });
    }
  }, [isSuccess, data, dispatch, isError, error, isLoading]);


  return (
    <Layout >
      <>
        <div className='signin-container'>
          <div className="user-login-container">
            <div className="">
              <div className="user-login-content ">
                <div className="first-content">
                  <h1 className='login-heading'>
                    Bangladesh #1 <br /> Marketplace
                  </h1>
                  <h6>
                    Create a Bangladesh Mart seller account in 5 minutes and reach
                    millions of customers today!
                  </h6>
                </div>
                <div className="second-content">
                  <div
                    className="login-form"
                  >
                    <h2 className="text-center">Login your Account</h2>
                    <p className="text-center">
                      Welcome! Millions of Bangladesh Mart users are waiting to buy
                      your product.
                    </p>

                    <form onSubmit={handleCreateCustomerAccount}>

                      <div>
                        <label htmlFor="email">Email</label> <br />
                        <input
                          id='email'
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-100 py-2 px-3 rounded mt-2"
                          style={{ border: '1px solid #6c7778' }}
                          type="email"
                          autoComplete="on"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="mt-3">
                        <label htmlFor="password">Password</label> <br />
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-100 py-2 px-3 mt-2 rounded"
                          type={showPass ? 'text' : 'password'}
                          id='password'
                          style={{ border: '1px solid #6c7778' }}
                          placeholder="Enter password"
                        />
                      </div>
                      <div className="icon-container">
                        {showPass ? (
                          <AiFillEye
                            onClick={() => setShowPass(!showPass)}
                            className="fs-5 mobile-signup-password-show-button"
                          />
                        ) : (
                          <AiFillEyeInvisible
                            onClick={() => setShowPass(!showPass)}
                            className="fs-5 mobile-signup-password-show-button"
                          />
                        )}
                      </div>
                      <div className="mt-4">
                        <button
                          type="submit"
                          style={{ backgroundColor: '#fd5417', fontWeight: '500' }}
                          className="w-100 text-white py-2 border-0 rounded"
                        >
                          Login
                        </button>
                      </div>
                    </form>


                    <div className='mt-3 seller-login-btn'>
                      <p className=''>Haven't an account ? <span onClick={() => router.push('/signup')} className=''>Click for Register</span></p>
                    </div>

                    <p className="mobile-signin-divider">or sign in with</p>
                    <GoogleLogin />
                    <button
                      style={{ backgroundColor: '#3b5998' }}
                      className="btn mobile-facebook-signin-btn"
                    >
                      <FaFacebookF></FaFacebookF> Facebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};
export default signin;
