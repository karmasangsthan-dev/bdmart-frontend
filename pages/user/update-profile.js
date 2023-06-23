import React from 'react';
import SideBar from '../../components/User/SideBar/SideBar';
import Layout from '../../components/Layout';
import UpdateProfile from '../../components/User/UpdateProfile/UpdateProfile';

const updateProfile = () => {
    return (
        <Layout>
            <div style={{ minHeight: '120vh' }} className="bg-gray-50">
                <div className='user-dashboard-container'>
                    <div className="dashboard-container-content">

                        <SideBar></SideBar>

                        <div className="dashbord-content-preview">
                            <div className="dash-overflow-hidden">
                                <UpdateProfile></UpdateProfile>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default updateProfile;