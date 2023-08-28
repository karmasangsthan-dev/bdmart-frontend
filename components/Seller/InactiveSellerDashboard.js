import React from 'react';
import SellerSidebar from './SellerSidebar';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useRouter } from 'next/router';
import SellerForm from './SellerForm';
import { toast } from 'react-hot-toast';
import { logOutSeller } from '../../features/auth/authSlice';

const InactiveSellerDashboard = () => {
    const dispatch = useDispatch();
    const seller = useSelector((state) => state.auth.seller);
    const [signOut, loading, error] = useSignOut(auth);
    const router = useRouter();
    const handleSellerLogout = () => {
        try {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("sellerAccessToken");
            toast.success("Seller logout successful");
        } catch (error) {
            console.log(error)
        }
    };
    // /user/dashboard
    const textParams = router.pathname;
    const textPath = textParams.split('/seller/')[1];


    return (
        <div style={{ minHeight: '120vh' }} className="bg-gray-50">
            <div className='user-dashboard-container'>
                <div className="dashboard-container-content">
                    <div className='dashboard-sidebar'>
                        <div className="sidebar-content" style={{ minHeight: '50vh' }}>
                            <Link href='/seller/dashboard'>
                                <span className={`sidebar-item ${textPath === 'dashboard' && 'active-nav-bg'}`}>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={`flex-shrink-0 h-4 w-4 ${textPath === 'dashboard' && 'active-sidebar-nav'} `} aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="176" height="176" x="48" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="48" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect></svg>
                                    <span className={`sidebar-item-anchor ${textPath === 'dashboard' && 'active-sidebar-nav'}`}>Dashboard</span>
                                </span>
                            </Link>
                            <span onClick={handleSellerLogout} className='sidebar-item'>
                                <span>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M336 112a80 80 0 00-160 0v96"></path><rect width="320" height="272" x="96" y="208" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="48" ry="48"></rect></svg>
                                </span>
                                <a className='sidebar-item-anchor' href="#">Log Out</a>
                            </span>

                        </div>
                    </div >
                    <div className="dashbord-content-preview">
                        <div className="dash-overflow-hidden">
                            <div className='d-flex justify-content-center'>
                                <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/high-priority.png" alt="high-priority" />
                            </div>

                            <p className='text-danger text-center mt-2'>Your account was not verified !! Please fill up all details about you and your company.</p>

                            <div>
                                <div className="checkout-container " style={{ paddingLeft: '0.5rem', paddingRight: '0.5rems' }}>
                                    <div className="d-flex checkout-full-content">
                                        <div style={{ width: '100%' }} className="checkout-left-side">
                                            <div className="left-content">
                                                <SellerForm seller={seller}></SellerForm>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InactiveSellerDashboard;