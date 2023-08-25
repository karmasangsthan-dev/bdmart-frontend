import banner from '../../public/images/seller-banner.png';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  useSellerAccountVerifyMutation,
  useSellerSignupMutation,
  useSendOTPMutation,
  useVerifyOTPForSellerMutation,
} from '../../features/auth/authApi';
import { setCookie } from '../../utils/setCookie';
import { useRouter } from 'next/router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { fetchSeller, fetchUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const SellerRegister = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isEmailSend, setIsEmailSend] = useState(0);
  const [isVerified, setIsVerified] = useState(0);
  const [OTP, setOTP] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [
    sendOTP,
    {
      data: sendOTPData,
      isLoading: isLoadingSendOTP,
      isSuccess: isSuccessSendOTP,
      isError: isErrorSendOTP,
      error: sendOTPError,
    },
  ] = useSendOTPMutation();
  const [
    verifyOTPForSeller,
    {
      data: verifyOTPData,
      isLoading: isLoadingVerifyOTP,
      isSuccess: isSuccessVerifyOTP,
      isError: isErrorVerifyOTP,
      error: verifyOTPError,
    },
  ] = useVerifyOTPForSellerMutation();
  const [
    sellerSignup,
    {
      data: sellerSignupData,
      isLoading: sellerSignupLoading,
      isSuccess: sellerSignupSuccess,
      isError: sellerSignupError,
      error: sellerError,
    },
  ] = useSellerSignupMutation();

  const handleCreateSellerAccount = (event) => {
    event.preventDefault();
    sellerSignup({ email, password });
  };
  const sendEmailVerificationCode = () => {
    sendOTP({ email });
  };
  const checkOTPVerified = () => {
    verifyOTPForSeller({ OTP, email });
  };

  useEffect(() => {
    // Handling sendOTP mutation
    if (isLoadingSendOTP) {
      toast.loading('Sending OTP...', { id: 'sendOTP' });
    }
    if (isSuccessSendOTP) {
      toast.success('OTP sent successfully, please check your email', {
        id: 'sendOTP',
      });
      setIsEmailSend(1);
    }
    if (sendOTPError) {
      toast.error(sendOTPError?.data?.message, { id: 'sendOTP' });
    }
  }, [isSuccessSendOTP, isErrorSendOTP, isLoadingSendOTP, sendOTPError]);

  useEffect(() => {
    // seller signup
    if (sellerSignupLoading) {
      toast.loading('Creating account. please wait...!!');
    }
    if (sellerSignupSuccess) {
      toast.success('Seller account create successfully');
      localStorage.setItem('accessToken', sellerSignupData?.token);
      toast.success('Signup success..', { id: 'sellerSignup' });
      dispatch(fetchSeller(sellerSignupData?.token));
      router.push('/seller/dashboard');
    }
    // Handling verifyOTPForSeller mutation
    if (isLoadingVerifyOTP) {
      toast.loading('Loading...', { id: 'verifyOTPForSeller' });
    }
    if (isSuccessVerifyOTP) {
      toast.success('OTP matched!', { id: 'verifyOTPForSeller' });
      setIsVerified(1);
    }
    if (isErrorVerifyOTP) {
      toast.error(verifyOTPError?.data?.error, { id: 'verifyOTPForSeller' });
    }
  }, [
    isSuccessVerifyOTP,
    isErrorVerifyOTP,
    isLoadingVerifyOTP,
    verifyOTPError,
    sellerSignupSuccess,
    sellerSignupLoading,
  ]);
  return (
    <div style={{ minHeight: '120vh' }}>
      <div className="seller-login-container">
        <div className="">
          <div className="d-flex align-items-center py-5 ">
            <div className="w-50 px-5">
              <h1 className="text-white " style={{ fontSize: '62px' }}>
                Bangladesh #1 <br /> Marketplace
              </h1>
              <h6 className="text-white">
                Create a Bangladesh Mart seller account in 5 minutes and reach
                millions of customers today!
              </h6>
            </div>
            <div className="w-50 px-5">
              <div
                className="login-form p-5 "
                style={{ borderRadius: '15px', background: '#f7f7f7' }}
              >
                <h2 className="text-center">Create Seller Account</h2>
                <p className="text-center">
                  Welcome! Millions of Bangladesh Mart users are waiting to buy
                  your product.
                </p>

                <div>
                  <label htmlFor="email">Email</label> <br />
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-100 py-2 px-3 rounded mt-2 ${
                      isEmailSend === 1 && `seller-email-blur`
                    } ${isVerified === 1 && 'verification-success '}`}
                    style={{ border: '1px solid #6c7778' }}
                    type="email"
                    id="email"
                    disabled={isEmailSend === 1}
                    placeholder="Enter email address"
                  />
                  {isEmailSend === 1 && (
                    <div className="change-email">
                      <p
                        onClick={() => {
                          setIsEmailSend(0);
                          setIsVerified(0);
                        }}
                        className=""
                      >
                        change email
                      </p>
                    </div>
                  )}
                </div>
                {isEmailSend === 1 && (
                  <div className="mt-3">
                    <label htmlFor="">Verification Code</label> <br />
                    <input
                      onChange={(e) => setOTP(e.target.value)}
                      className={`w-100 py-2 px-3 mt-2 rounded ${
                        isVerified === 1 &&
                        'verification-success seller-email-blur'
                      } `}
                      type="text"
                      disabled={isVerified === 1}
                      style={{ border: '1px solid #6c7778' }}
                      placeholder="Enter verification code"
                    />
                  </div>
                )}

                {isVerified === 1 && isEmailSend === 1 && (
                  <div className="mt-3">
                    <label htmlFor="">Password</label> <br />
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-100 py-2 px-3 mt-2 rounded `}
                      type={showPass ? 'text' : 'password'}
                      style={{ border: '1px solid #6c7778' }}
                      placeholder="Enter password"
                    />
                  </div>
                )}

                {isVerified === 1 && isEmailSend === 1 && (
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
                )}

                <div className="mt-4">
                  {isVerified === 1 && (
                    <button
                      onClick={handleCreateSellerAccount}
                      style={{ backgroundColor: '#fd5417', fontWeight: '500' }}
                      className="w-100 text-white py-2 border-0 rounded"
                    >
                      Create Account
                    </button>
                  )}
                  {isEmailSend === 1 && isVerified === 0 && (
                    <button
                      onClick={() => checkOTPVerified()}
                      style={{ backgroundColor: '#fd5417', fontWeight: '500' }}
                      className="w-100 text-white py-2 border-0 rounded"
                    >
                      Verify Email
                    </button>
                  )}
                  {isEmailSend === 0 && isVerified === 0 && (
                    <button
                      onClick={() => {
                        if (!email) {
                          toast.error('Please enter email address');
                        } else if (
                          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                            email
                          )
                        ) {
                          toast.error('Please enter valid email address');
                        } else {
                          sendEmailVerificationCode();
                        }
                      }}
                      style={{ backgroundColor: '#fd5417', fontWeight: '500' }}
                      className="w-100 text-white py-2 border-0 rounded"
                    >
                      Next
                    </button>
                  )}
                </div>
                <div className="mt-3 seller-login-btn">
                  <p className="">
                    Have an account ?{' '}
                    <span
                      onClick={() => router.push('/seller/login')}
                      className=""
                    >
                      Click for Login
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
