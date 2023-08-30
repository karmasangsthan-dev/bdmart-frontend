import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../../../firebase.init';
import { useRouter } from 'next/router';
import { logOutSeller } from '../../../features/auth/authSlice';
import { toast } from 'react-hot-toast';

const ContactHeaderSellerLogOut = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [signOut, loading, error] = useSignOut(auth);
    const router = useRouter();
    const handleSellerLogout = () => {
        try {
            localStorage.removeItem("sellerAccessToken");
            dispatch(logOutSeller())
            toast.success("Seller Logout Successful");
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <button onClick={handleSellerLogout} className="d-flex align-items-center ">
            <span className="me-1 d-flex align-items-center">
                <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                </svg>
            </span>
            Logout seller
        </button>
    );
};

export default ContactHeaderSellerLogOut;