import React from 'react';
import Layout from '../../components/Layout';
import ChangePassword from '../../components/User/ChangePassword/ChangePassword'
import SideBar from '../../components/User/SideBar/SideBar';
import RequireAuth from '../../components/Shared/RequireAuth/RequireAuth'
const ChangeUserPassword = () => {
    return (
        <Layout>
            <div style={{ minHeight: '120vh' }} className="bg-gray-50">
                <div className='user-dashboard-container'>
                    <div className="dashboard-container-content">

                        <SideBar></SideBar>

                        <div className="dashbord-content-preview">
                            <div className="dash-overflow-hidden">
                                <ChangePassword></ChangePassword>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RequireAuth(ChangeUserPassword);