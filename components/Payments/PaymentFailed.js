import { useRouter } from 'next/router';
import React from 'react';

const PaymentFailed = ({ TxID }) => {
    const router = useRouter();
    const handleNavigateInCheckoutPage = () => {
        router.push(`/checkout`)
    }
    return (
        <div className="payment-success-container">
            <div className="payment-content">
                <img
                    src="https://img.icons8.com/color/48/fail.png"
                    alt="success"
                />
                <div className='details'>
                    <h1 className='payment-failed text-danger'>Payment Failed</h1>
                    <p className='name '>Hi <span >Md Altaf Hossen,</span></p>
                    <p className='status text-danger '>Your transaction failed. Please check your payment method account and ensure that you have sufficient funds to purchase this item. Then, try again.</p>
                    
                </div>
                <div>
                    <button onClick={handleNavigateInCheckoutPage}>Retry Payment</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;