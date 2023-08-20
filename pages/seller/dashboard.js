import React from 'react';
import Layout from '../../components/Layout';
import SideBar from '../../components/User/SideBar/SideBar';
import RequireAuth from '../../components/Shared/RequireAuth/RequireAuth'
import SellerSidebar from '../../components/Seller/SellerSidebar';
import SellerDashboard from '../../components/Seller/SellerDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import auth from '../../firebase.init';
import Link from 'next/link';
import SellerLayout from '../../components/Seller/SellerLayout';
import InactiveSellerDashboard from '../../components/Seller/InactiveSellerDashboard';
const dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [signOut, loading, error] = useSignOut(auth);
    const router = useRouter();
    const handleLogout = () => {
        if (user?.providerId === "custom") {
            localStorage.removeItem("accessToken");
            dispatch(logOut());
            toast.success("Logout Successful", { id: "logout" });
        }
        if (user?.providerId === "firebase") {
            try {
                const success = signOut().then(() => {
                    localStorage.removeItem("accessToken");
                    dispatch(logOut());
                    toast.success("Logout successful", { id: "logout" });
                });
            } catch (error) { }
        }
    };
    // /user/dashboard
    const textParams = router.pathname;
    const textPath = textParams.split('/seller/')[1];

    const sellerUser = {
        name: 'Altaf', email: 'web.altaf.1@gmail.com', passowrd: '12345678', status: 'active'
    }


    return (
        <Layout>
            {
                sellerUser?.status === 'active' && <SellerLayout>
                    <SellerDashboard></SellerDashboard>
                </SellerLayout>
            }
            {
                sellerUser?.status === 'inactive' && <InactiveSellerDashboard></InactiveSellerDashboard>
            }
        </Layout>
    );
};

export default dashboard;