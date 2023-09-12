import React from 'react';
import Layout from '../../components/Layout';
import SideBar from '../../components/User/SideBar/SideBar';
import RequireAuth from '../../components/Shared/RequireAuth/RequireAuth'
import DashboardLanding from '../../components/User/DashboardLanding/DashboardLanding'
import { useSelector } from 'react-redux';
import Loading from '../../components/Shared/Loading/Loading';
const dashboard = () => {
    const { user, isLoading } = useSelector((state) => state?.auth);
    console.log({user})
    return (
        <Layout>
            {isLoading ? <Loading></Loading> :
                <div style={{ minHeight: '120vh' }} className="bg-gray-50">
                    <div className='user-dashboard-container'>
                        <div className="dashboard-container-content">
                            {/* sidebar  */}
                            <SideBar></SideBar>
                            <DashboardLanding></DashboardLanding>
                        </div>
                    </div>
                </div>}
        </Layout>
    );
};

export default dashboard;