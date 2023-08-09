import React from 'react';
import SellerSidebar from '../Seller/SellerSidebar';

const SellerDashboard = () => {
    return (
        <>
            <h2 className='dash-content-heading'>Dashboard</h2>
            <div className="dashboard-first-section">
                <div className='d-flex ' style={{ height: "100%" }}>
                    <div className='dash-heading-details-icon'>
                        <div className='child'>
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        </div>
                        <div className="child-2">
                            <h5>Total Order</h5>
                            <p>4</p>
                        </div>
                    </div>
                </div>
                <div className='d-flex ' style={{ height: "100%" }}>
                    <div className='dash-heading-details-icon'>
                        <div className='child pending-order'>
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                        </div>
                        <div className="child-2">
                            <h5>Pending Order</h5>
                            <p>10</p>
                        </div>
                    </div>
                </div>
                <div className='d-flex ' style={{ height: "100%" }}>
                    <div className='dash-heading-details-icon'>
                        <div className='child processing-order'>
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                        </div>
                        <div className="child-2">
                            <h5>Processing Order</h5>
                            <p>5</p>
                        </div>
                    </div>
                </div>
                <div className='d-flex ' style={{ height: "100%" }}>
                    <div className='dash-heading-details-icon'>
                        <div className='child success-order'>
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <div className="child-2">
                            <h5>Complete Order</h5>
                            <p>34</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default SellerDashboard;