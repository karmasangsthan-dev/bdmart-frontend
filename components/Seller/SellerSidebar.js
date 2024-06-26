import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { logOutSeller } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';

const SellerSidebar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleSellerLogout = () => {
        try {
            localStorage.removeItem("sellerAccessToken");
            localStorage.removeItem("accessToken");
            toast.success("Seller Logout Successful");
        } catch (error) {
            console.log(error)
        }
    };
    // /user/dashboard
    const textParams = router.pathname;
    const textPath = textParams.split('/seller/')[1];
    return (
        <div>
            <div className='dashboard-sidebar'>
                
                <div className="sidebar-content">
                    <Link href='/seller/dashboard'>
                        <span className={`sidebar-item ${textPath === 'dashboard' && 'active-nav-bg'}`}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={`flex-shrink-0 h-4 w-4 ${textPath === 'dashboard' && 'active-sidebar-nav'} `} aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="176" height="176" x="48" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="48" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect></svg>
                            <span className={`sidebar-item-anchor ${textPath === 'dashboard' && 'active-sidebar-nav'}`}>Dashboard</span>


                        </span>
                    </Link>

                    <Link href='/seller/my-products'>
                        <span className={`sidebar-item ${textPath === 'my-products' && 'active-nav-bg'}`}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={`flex-shrink-0 h-4 w-4 ${textPath === 'my-orders' && 'active-sidebar-nav'}`} aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M160 144h288M160 256h288M160 368h288"></path><circle cx="80" cy="144" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><circle cx="80" cy="256" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><circle cx="80" cy="368" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle></svg>
                            <span className={`sidebar-item-anchor ${textPath === 'my-orders' && 'active-sidebar-nav'}`}>My Products</span>

                        </span>
                    </Link>
                    <Link href='/seller/sels-management'>
                        <span className={`sidebar-item ${textPath === 'sels-management' && 'active-nav-bg'}`}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={`flex-shrink-0 h-4 w-4 ${textPath === 'my-orders' && 'active-sidebar-nav'}`} aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M160 144h288M160 256h288M160 368h288"></path><circle cx="80" cy="144" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><circle cx="80" cy="256" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><circle cx="80" cy="368" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle></svg>
                            <span className={`sidebar-item-anchor ${textPath === 'sels-management' && 'active-sidebar-nav'}`}>Order and Sales Management</span>

                        </span>
                    </Link>
                    <Link href='/seller/payments'>
                        <span className={`sidebar-item ${textPath === 'payments' && 'active-nav-bg'}`}>

                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={`flex-shrink-0 h-4 w-4 ${textPath === 'payments' && 'active-sidebar-nav'}`} aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"></path></svg>
                            <span className={`sidebar-item-anchor ${textPath === 'payments' && 'active-sidebar-nav'}`}>Payment and Payouts</span>
                        </span>
                    </Link>
                    {/* <Link href='/seller/customer-communication'>
                        <span className={`sidebar-item ${textPath === 'customer-communication' && 'active-nav-bg'}`}>

                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={`flex-shrink-0 h-4 w-4 ${textPath === 'customer-communication' && 'active-sidebar-nav'}`} aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"></path></svg>
                            <span className={`sidebar-item-anchor ${textPath === 'customer-communication' && 'active-sidebar-nav'}`}>Customer Communication</span>
                        </span>
                    </Link>
                    <Link href='/seller/reviews-and-ratings'>
                        <span className={`sidebar-item ${textPath === 'reviews-and-ratings' && 'active-nav-bg'}`}>

                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={`flex-shrink-0 h-4 w-4 ${textPath === 'reviews-and-ratings' && 'active-sidebar-nav'}`} aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"></path></svg>
                            <span className={`sidebar-item-anchor ${textPath === 'reviews-and-ratings' && 'active-sidebar-nav'}`}>Reviews and Ratings</span>
                        </span>
                    </Link> */}


                    <span onClick={handleSellerLogout} className='sidebar-item'>
                        <span>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M336 112a80 80 0 00-160 0v96"></path><rect width="320" height="272" x="96" y="208" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="48" ry="48"></rect></svg>
                        </span>
                        <a className='sidebar-item-anchor' href="#">Log Out</a>
                    </span>

                </div>
            </div >
        </div>
    );
};

export default SellerSidebar;