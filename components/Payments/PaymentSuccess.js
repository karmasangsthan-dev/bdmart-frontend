import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PaymentSuccess = ({ TxID }) => {
    const router = useRouter();

    const handleNavigateHomepage = () => {
        router.push(`/`)
    }
    const handleShowInvoice = () => {
        router.push(`/user/my-orders`)
    }


    return (
        <div className='payment-success-container'>
            <div className="payment-content">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                    alt="success"
                />
                <div className='details'>
                    <h1>Payment received</h1>
                    <p className='name'>Hi Md Altaf Hossen,</p>
                    <p className='status'>Your transaction was successful !!</p>
                    <p>Order Id : #056784</p>
                    <h6>Transaction Id: {TxID}</h6>
                </div>
                <div>
                    <button onClick={handleShowInvoice}>See Order Details</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;