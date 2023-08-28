import React from 'react';
import Layout from '../../components/Layout';
import SellerDashboard from '../../components/Seller/SellerDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import InactiveSellerDashboard from '../../components/Seller/InactiveSellerDashboard';
import SellerLayoutDashboard from '../../components/Seller/SellerLayoutDashboard';
import Loading from '../../components/Shared/Loading/Loading'
import RequireAuthSeller from '../../components/Shared/RequireAuth/RequireAuthSeller';
const dashboard = () => {
    const dispatch = useDispatch();
    const { seller, isLoading } = useSelector((state) => state.auth);
    const router = useRouter();

    // /seller/dashboard
    const textParams = router.pathname;
    const textPath = textParams.split('/seller/')[1];
    console.log({seller, isLoading })

    return (
        <Layout>
            

            {
                seller?.status === 'active' && <SellerLayoutDashboard>
                    <SellerDashboard></SellerDashboard>
                </SellerLayoutDashboard>
            }
            {
                seller?.status === 'inactive' && <InactiveSellerDashboard></InactiveSellerDashboard>
            }
        </Layout>
    );
};

export default dashboard;