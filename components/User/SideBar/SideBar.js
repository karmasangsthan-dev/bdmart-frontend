import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';


const SideBar = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [signOut, loading, error] = useSignOut(auth);
    const router = useRouter();
    const handleLogout = () => {
        if (user?.providerId === "custom") {
            localStorage.removeItem("accessToken");
            dispatch(logOut());
            toast.success("Logout Successful", { id: "logout" });
        }
        if (user?.providerId === "firebase") {
            try {
                const success = signOut().then(() => {
                    localStorage.removeItem("accessToken");
                    dispatch(logOut());
                    toast.success("Logout successful", { id: "logout" });
                });
            } catch (error) { }
        }
    };

    return (
        <div className='dashboard-sidebar'>
            <div className="sidebar-content">
                <span className='sidebar-item'>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="flex-shrink-0 h-4 w-4" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="176" height="176" x="48" y="48" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="48" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="20" ry="20"></rect><rect width="176" height="176" x="48" y="288" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="288" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="20" ry="20"></rect></svg>
                    <a onClick={() => router.push('/user/dashboard')} className='sidebar-item-anchor' href="#">Dashboard</a>
                </span>
                <span className='sidebar-item'>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="flex-shrink-0 h-4 w-4" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 144h288M160 256h288M160 368h288"></path><circle cx="80" cy="144" r="16" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="80" cy="256" r="16" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="80" cy="368" r="16" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle></svg>
                    <a className='sidebar-item-anchor' href="/user/my-orders">My Orders</a>
                </span>
                <span className='sidebar-item'>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="flex-shrink-0 h-4 w-4" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"></path></svg>
                    <a className='sidebar-item-anchor' href="/user/update-profile">Update Profile</a>
                </span>
                <span className='sidebar-item'>
                    <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" class="flex-shrink-0 h-4 w-4" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <a className='sidebar-item-anchor' href="/user/change-password">Change Password</a>
                </span>
                <span onClick={handleLogout} className='sidebar-item'>
                    <span>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M336 112a80 80 0 00-160 0v96"></path><rect width="320" height="272" x="96" y="208" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="48" ry="48"></rect></svg>
                    </span>
                    <a className='sidebar-item-anchor' href="#">Log Out</a>
                </span>

            </div>
        </div>
    );
};

export default SideBar;