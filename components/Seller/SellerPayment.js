import React from 'react';

const SellerPayment = () => {
    return (
        <div className=''>
            <div className='shadow card px-4 py-5'>
                <h5>Estimate Total : $450</h5>
                <p>You received : $350</p>
                <p>Due : $150</p>
            </div>
            <div>

            </div>
            <div className='card px-4 py-5 mt-5'>
                <p className='text-center'>You have no payment transaction history !!</p>
            </div>
        </div>
    );
};

export default SellerPayment;