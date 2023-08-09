import React from 'react';
import Layout from '../../components/Layout';
import SellerSidebar from '../../components/Seller/SellerSidebar';
import SellerLayout from '../../components/Seller/SellerLayout';

const MyProducts = () => {
    return (
        <Layout title='My Products | Seller Account | Bangladesh Mart'>
            <SellerLayout >
                <h2 className='dash-content-heading'>My Products</h2>
            </SellerLayout>
        </Layout>
    );
};

export default MyProducts;