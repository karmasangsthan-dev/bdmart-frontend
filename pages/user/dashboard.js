import React from 'react';
import Layout from '../../components/Layout';
import SideBar from '../../components/User/SideBar/SideBar';
import Dashboard  from '../../components/User/Dashboard/Dashboard';
import RequireAuth from '../../components/Shared/RequireAuth/RequireAuth'
const dashboard = () => {
    return (
        <Layout>
            <div style={{ minHeight: '120vh' }} className="bg-gray-50">
                <div className='user-dashboard-container'>
                    <div className="dashboard-container-content">
                        {/* sidebar  */}
                        <SideBar></SideBar>
                        <Dashboard></Dashboard>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RequireAuth(dashboard);