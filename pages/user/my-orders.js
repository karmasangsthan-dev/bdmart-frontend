import React from 'react';
import Layout from '../../components/Layout';
import SideBar from '../../components/User/SideBar/SideBar';
import MyOrders from '../../components/User/MyOrders/MyOrders';
import RequireAuth from '../../components/Shared/RequireAuth/RequireAuth'
const myOrders = () => {
    return (
        <Layout>
            <div style={{ minHeight: '120vh' }} className="bg-gray-50">
                <div className='user-dashboard-container'>
                    <div className="dashboard-container-content">

                        <SideBar></SideBar>

                        <div className="dashbord-content-preview">
                            <div className="dash-overflow-hidden">
                                <MyOrders></MyOrders>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RequireAuth(myOrders);