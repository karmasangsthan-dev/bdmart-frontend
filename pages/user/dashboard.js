import React from 'react';
import Layout from '../../components/Layout';
import SideBar from '../../components/User/SideBar/SideBar';
import RequireAuth from '../../components/Shared/RequireAuth/RequireAuth'
import DashboardLanding from '../../components/User/DashboardLanding/DashboardLanding'
import { useSelector } from 'react-redux';
import Loading from '../../components/Shared/Loading/Loading';
import { useRouter } from 'next/router';
const dashboard = () => {
    const { user, isLoading } = useSelector((state) => state?.auth);
    const router = useRouter();
    console.log(user);
    if (isLoading) {
        return (
            <Layout>
                <Loading></Loading>
            </Layout>
        )
    }
    if (!user?.email) {
        return (
            <Layout>
                <div className="text-center w-full d-flex justify-content-center  align-items-center mt-5 gap-3" style={{flexDirection:'column'}}>
                    <p>You haven't logged in. Please login before access dashboard</p>
                    <button onClick={() => router.push({
                        pathname: "/signin",
                        query: { redirect: router.asPath },
                    })} className='update-profile-button'>Please Login</button>
                </div>
            </Layout>
        )
    }

    return <Layout>
        <div style={{ minHeight: '120vh' }} className="bg-gray-50">
            <div className='user-dashboard-container'>
                <div className="dashboard-container-content">

                    <SideBar></SideBar>
                    <DashboardLanding></DashboardLanding>
                </div>
            </div>
        </div>


    </Layout>
};

export default dashboard;