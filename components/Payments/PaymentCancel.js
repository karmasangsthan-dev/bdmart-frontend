import { useRouter } from 'next/router';
import React from 'react';

const PaymentCancel = ({ TxID }) => {
    const router = useRouter();
    const handleNavigateHomepage = () => {
        router.push('/')
    }
    return (
        <div className="payment-success-container">
            <div className="payment-content">
                <img
                    src="https://img.icons8.com/color/48/fail.png"
                    alt="cancel"
                />
                <div className='details'>
                    <h1 className='payment-cancel text-danger'>Opps !! <br />Payment Cancel </h1>
                    <p className='name'>Hi Md Altaf Hossen,</p>
                    <p className='status text-danger'>You cancel this payment. It hurt us a lot !! <span>&#128546;</span> </p>
                </div>
                <div>
                    <button onClick={handleNavigateHomepage}>Back To Home</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;