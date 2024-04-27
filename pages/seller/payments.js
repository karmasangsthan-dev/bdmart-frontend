import React from 'react';
import Layout from '../../components/Layout';
import SellerLayoutDashboard from '../../components/Seller/SellerLayoutDashboard';
import SellerPayment from '../../components/Seller/SellerPayment';

const payments = () => {

    return (
        <Layout title='My Products | Seller Account | Bangladesh Mart'>
            <SellerLayoutDashboard >
                <h2 className='dash-content-heading'>Payment and Payouts</h2>

                <SellerPayment></SellerPayment>

            </SellerLayoutDashboard>
        </Layout>
    );
};

export default payments;