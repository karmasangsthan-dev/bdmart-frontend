import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useSellerSigninMutation } from '../../features/auth/authApi';

const SellerLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [sellerSignin, { data, isLoading, isSuccess, isError, error }] = useSellerSigninMutation();

  const handleCreateSellerAccount = (e) => {
    e.preventDefault();
    sellerSignin({ email, password })
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'sellerSignin' });
    }
    if (isSuccess) {
      localStorage.setItem('accessToken', data.token);
      toast.success('Success', { id: 'sellerSignin' });
      router.push('/seller/dashboard')
    }
    if (isError) {
      toast.error(error?.data?.error, { id: 'sellerSignin' });
    }
  }, [isSuccess, data, isError, error, isLoading]);

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
            <form onSubmit={handleCreateSellerAccount} className="w-50 px-5">
              <div
                className="login-form p-5 "
                style={{ borderRadius: '15px', background: '#f7f7f7' }}
              >
                <h2 className="text-center">Login Seller Account</h2>
                <p className="text-center">
                  Welcome! Millions of Bangladesh Mart users are waiting to buy
                  your product.
                </p>

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
                    Login As Seller
                  </button>
                </div>
                <div className='mt-3 seller-login-btn'>
                  <p className=''>Haven't an account ? <span onClick={() => router.push('/seller/register')} className=''>Click for Register</span></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
