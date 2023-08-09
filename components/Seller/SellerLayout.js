import React from 'react';
import SellerSidebar from './SellerSidebar';

const SellerLayout = ({ children}) => {
    return (
        <div style={{ minHeight: '120vh' }} className="bg-gray-50">
            <div className='user-dashboard-container'>
                <div className="dashboard-container-content">
                    <SellerSidebar></SellerSidebar>
                    <div className="dashbord-content-preview">
                        <div className="dash-overflow-hidden">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SellerLayout;