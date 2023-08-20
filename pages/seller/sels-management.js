import React from 'react';
import Layout from '../../components/Layout';
import SellerLayout from '../../components/Seller/SellerLayout';

const SelsManageMent = () => {
    return (
        <Layout>
            <SellerLayout>
                <h2 className='dash-content-heading'>Order and Sales Management</h2>
            </SellerLayout>
        </Layout>
    );
};

export default SelsManageMent;