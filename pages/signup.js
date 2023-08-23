import Link from 'next/link';

import { FaFacebookF } from 'react-icons/fa';
import Header from '../components/Shared/Header/Header';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomerSignupMutation, useSendCustomerOTPMutation, useSignupMutation, useVerifyOTPForCustomerMutation } from '../features/auth/authApi';
import { fetchUser, setUser } from '../features/auth/authSlice';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import GoogleLogin from '../components/Shared/SocialLogin/GoogleLogin';
import VerifiedEmailSent from '../components/Shared/Authenticaiotn/VerifiedEmailSent';
import { setCookie } from '../utils/setCookie';

const signup = () => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const [customerSignup, { data, isSuccess, isLoading, isError, error }] =
    useCustomerSignupMutation();
  const [email, setEmail] = useState('');
  const [deviceInfo, setDeviceInfo] = useState({});
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [deviceHeight, setDeviceHeight] = useState(0);
  const { query } = router;
  const { redirect } = query;
  const [isEmailSend, setIsEmailSend] = useState(0);
  const [isVerified, setIsVerified] = useState(0);
  const [OTP, setOTP] = useState(0);

  const [sendCustomerOTP, { data: sendOTPData, isLoading: isLoadingSendOTP, isSuccess: isSuccessSendOTP, isError: isErrorSendOTP, error: sendOTPError }] = useSendCustomerOTPMutation();
  const [verifyOTPForCustomer, { data: verifyOTPData, isLoading: isLoadingVerifyOTP, isSuccess: isSuccessVerifyOTP, isError: isErrorVerifyOTP, error: verifyOTPError }] = useVerifyOTPForCustomerMutation();

  const handleCreateCustomerAccount = () => {
    customerSignup({ email, password })
  };
  const checkCustomerOTPVerified = () => {
    verifyOTPForCustomer({ OTP, email })
  }
  const sendCustomerEmailVerificationCode = () => {
    sendCustomerOTP({ email });
  }

  useEffect(() => {
    setDeviceHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    // Handling sendOTPforCustomer  mutation
    if (isLoadingSendOTP) {
      toast.loading('Sending OTP...', { id: 'sendCustomerOTP' });
    }
    if (isSuccessSendOTP) {
      toast.success('OTP sent successfully, please check your email', { id: 'sendCustomerOTP' });
      setIsEmailSend(1);
    }
    if (sendOTPError) {
      toast.error(sendOTPError?.data?.message, { id: 'sendCustomerOTP' });
    }
  }, [isSuccessSendOTP, isErrorSendOTP, isLoadingSendOTP, sendOTPError]);

  useEffect(() => {
    // Handling verifyOTPForCustomer mutation
    if (isLoadingVerifyOTP) {
      toast.loading('Loading...', { id: 'verifyOTPForCustomer' });
    }
    if (isSuccessVerifyOTP) {
      toast.success('OTP matched!', { id: 'verifyOTPForCustomer' });
      setIsVerified(1)
    }
    if (isErrorVerifyOTP) {
      toast.error(verifyOTPError?.data?.error, { id: 'verifyOTPForCustomer' });
    }
  }, [isSuccessVerifyOTP, isErrorVerifyOTP, isLoadingVerifyOTP, verifyOTPError])


  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("accessToken", data?.token);
      toast.success('Signup success..', { id: 'customerSignup' });
      dispatch(fetchUser(data?.token));
      router.push(redirect || '/');
    }
    if (isLoading) {
      toast.loading('Loading...', { id: 'customerSignup' });
    }
    if (isError) {
      toast.error(error?.data?.error, { id: 'customerSignup' });
    }
  }, [isSuccess, isLoading, isError, error, dispatch, data?.token, user]);

  return (
    <div
      style={{ minHeight: deviceHeight < 650 ? '120vh' : 'auto' }}
      className=""
    >
      <Header></Header>

      <>
        <div style={{ minHeight: '120vh' }}>
          <div className="seller-login-container">
            <div className="">
              <div className="d-flex align-items-center py-3 ">
                <div className="w-50 px-5">
                  <h1 className="text-white " style={{ fontSize: '52px' }}>
                    Bangladesh Mart
                  </h1>
                  <h6 className="text-white">
                    Create a Bangladesh Mart account in 1 minutes and reach
                    millions of support today!
                  </h6>
                </div>
                <div className='w-50 px-5'>
                  <div
                    className="login-form p-5 "
                    style={{ borderRadius: '15px', background: '#f7f7f7' }}
                  >
                    <h2 className="text-center">Create an account</h2>
                    <p className="text-center">
                      Welcome sir/madam ! Bangladesh Mart is waiting for you with more and more products with best deals and best offers.
                    </p>

                    <div>
                      <label htmlFor="email">Email</label> <br />
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-100 py-2 px-3 rounded mt-2 ${isEmailSend === 1 && `seller-email-blur`} ${isVerified === 1 && 'verification-success '}`}
                        style={{ border: '1px solid #6c7778' }}
                        type="email"
                        id='email'
                        disabled={isEmailSend === 1}
                        placeholder="Enter email address"
                      />
                      {isEmailSend === 1 && <div className='change-email'>
                        <p onClick={() => {
                          setIsEmailSend(0)
                          setIsVerified(0)
                        }} className=''>change email</p>
                      </div>}
                    </div>
                    {isEmailSend === 1 && <div className="mt-3">
                      <label htmlFor="">Verification Code</label> <br />
                      <input
                        onChange={(e) => setOTP(e.target.value)}
                        className={`w-100 py-2 px-3 mt-2 rounded ${isVerified === 1 && 'verification-success seller-email-blur'} `}
                        type='text'
                        disabled={isVerified === 1}
                        style={{ border: '1px solid #6c7778' }}
                        placeholder="Enter verification code"
                      />

                    </div>}

                    {
                      isVerified === 1 && isEmailSend === 1 && <div className="mt-3">
                        <label htmlFor="">Password</label> <br />
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-100 py-2 px-3 mt-2 rounded `}
                          type={showPass ? 'text' : 'password'}
                          style={{ border: '1px solid #6c7778' }}
                          placeholder="Enter password"
                        />
                      </div>
                    }

                    {
                      isVerified === 1 && isEmailSend === 1 && <div className="icon-container">
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
                    }


                    <div className="mt-4">
                      {isVerified === 1 && <button
                        onClick={handleCreateCustomerAccount}
                        style={{ backgroundColor: '#fd5417', fontWeight: '500' }}
                        className="w-100 text-white py-2 border-0 rounded"
                      >
                        Create Account
                      </button>}
                      {
                        isEmailSend === 1 && isVerified === 0 && <button
                          onClick={() => checkCustomerOTPVerified()}
                          style={{ backgroundColor: '#fd5417', fontWeight: '500' }}
                          className="w-100 text-white py-2 border-0 rounded"
                        >
                          Verify Email
                        </button>
                      }
                      {isEmailSend === 0 && isVerified === 0 && <button
                        onClick={() => {
                          if (!email) {
                            toast.error('Please enter email address')
                          }
                          else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                            toast.error('Please enter valid email address')
                          }
                          else {
                            sendCustomerEmailVerificationCode();
                          }
                        }}
                        style={{ backgroundColor: '#fd5417', fontWeight: '500' }}
                        className="w-100 text-white py-2 border-0 rounded"
                      >
                        Next
                      </button>}
                    </div>
                    <div className='mt-3 seller-login-btn'>
                      <p className=''>Have an account ? <span onClick={() => router.push({
                        pathname: "/signin",
                        query: { redirect: router.asPath },
                      })} className=''>Click for Login</span></p>
                    </div>

                    <p className="mobile-signin-divider">or sign up with</p>
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
          </div >
        </div >
      </>
    </div>
  );
};
export default signup;
