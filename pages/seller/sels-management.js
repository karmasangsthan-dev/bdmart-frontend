import React from 'react';
import Layout from '../../components/Layout';
import SellerLayoutDashboard from '../../components/Seller/SellerLayoutDashboard';

const SelsManageMent = () => {
    return (
        <Layout>
            <SellerLayoutDashboard>
                <h2 className='dash-content-heading'>Order and Sales Management</h2>
            </SellerLayoutDashboard>
        </Layout>
    );
};

export default SelsManageMent;