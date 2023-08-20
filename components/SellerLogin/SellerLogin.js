import React, { useState } from 'react';
import banner from '../../public/images/seller-banner.png'
import { toast } from 'react-hot-toast';

const SellerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateSellerAccount = (event) => {
        event.preventDefault();
        toast.success("Account creating request received. Please check your email for next process")
    }
    return (
        <div style={{ minHeight: '120vh' }}>
            <div className='seller-login-container'>
                <div className=''>
                    <div className='d-flex align-items-center py-5 '>
                        <div className='w-50 px-5'>
                            <h1 className='text-white ' style={{ fontSize: '62px' }}>Bangladesh #1 <br /> Marketplace</h1>
                            <h6 className='text-white'>Create a Bangladesh Mart seller account in 5 minutes and reach millions of customers today!

                            </h6>
                        </div>
                        <div className='w-50 px-5'>
                            <form onSubmit={handleCreateSellerAccount}>
                                <div className="login-form p-5 " style={{ borderRadius: '15px', background: '#f7f7f7' }}>
                                    <h2 className='text-center'>Create an Account</h2>
                                    <p className='text-center'>Welcome! Millions of Bangladesh Mart users are waiting to buy your product.
                                    </p>

                                    <div>
                                        <label htmlFor="">Email</label> <br />
                                        <input onChange={(e)=>setEmail(e.target.value)} className='w-100 py-2 px-3 rounded mt-2' style={{ border: '1px solid #6c7778' }} type="email" placeholder='Enter email address' />

                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor="">Password</label> <br />
                                        <input onChange={(e)=>setPassword(e.target.value)} className='w-100 py-2 px-3 mt-2 rounded' type="password" style={{ border: '1px solid #6c7778' }} placeholder='Enter password' />

                                    </div>
                                    <div className='mt-4'>
                                        <button type='submit' style={{ backgroundColor: 'rgba(16,185,129,1)', fontWeight: '500' }} className='w-100 text-white py-2 border-0 rounded'>Create Account</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerLogin;