import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserPasswordMutation } from '../../../features/auth/authApi';
import { useRouter } from 'next/router';
import { fetchUser } from '../../../features/auth/authSlice';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState();
    const user = useSelector((state) => state.auth.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const [updateUserPassword, { isSuccess, isLoading, isError, error }] =
        useUpdateUserPasswordMutation();



    const handlePasswordUpdate = (event) => {
        event.preventDefault();
        const email = user?.email;
        const currentPassword = event.target.currentPassword.value;
        const newPass = event.target.newPass.value;
        if (!currentPassword && !newPass) {
            toast.error("Please enter current password and new password...!!")
        }
        else if (currentPassword && !newPass) {
            toast.error("Please enter new password...!!")
        }
        else if (!currentPassword && newPass) {
            toast.error("Please enter your current password...!!")
        }
        else if (email && currentPassword && newPass) {
            const data = {
                email: user?.email,
                oldPassword: currentPassword,
                newPassword: newPass
            }
            updateUserPassword({ token, data })

        }
    }
    const formRef = useRef(null); // Create a ref for the form
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setToken(token);
    }, []);
    if (user?.providerId === 'firebase') {
        router.push('/404')
    }

    useEffect(() => {

        if (isLoading) {
            toast.loading("Loading...", { id: "updateUserPassword" });
        }
        if (isSuccess) {
            dispatch(fetchUser(token));
            toast.success("Password changed successfully !!", { id: "updateUserPassword" });
            formRef.current.reset();
        }
        if (isError) {
            toast.error(error?.data?.error, { id: "updateUserPassword" });
        }
    }, [isSuccess, isLoading, isError]);

    return (
        <div className="dash-order-table">
            <div style={{ borderRadius: "0.375rem" }}>
                <div className='d-flex ' style={{ flexDirection: 'column' }}>
                    <h3 className='recent-order-title'>Change Password</h3>
                    <form ref={formRef} onSubmit={handlePasswordUpdate}>
                        <div className="row">
                            <div className="col-md-12">

                                <label htmlhtmlFor="name">Email:</label>
                                <input
                                    className="form-control form-control-red w-100 px-3 py-2 mb-3 "
                                    name="email"
                                    type="text"
                                    value={user?.email}
                                    readOnly
                                    style={{ userSelect: 'none' }}
                                    contentEditable="false"
                                />
                                <label htmlhtmlFor="name">Current Password
                                    :</label>
                                <input
                                    className="form-control w-100 px-3 py-2 mb-3 "
                                    name="currentPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Your Current Password'
                                />
                                <label htmlhtmlFor="new-pass">New Password
                                    :</label>
                                <input
                                    id='new-pass'
                                    className="form-control w-100 px-3 py-2 mb-3 "
                                    name="newPass"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Your New Password'
                                />
                                <div>
                                    <input
                                        style={{ cursor: 'pointer' }}
                                        type="checkbox"
                                        name=""
                                        id="showPass"
                                        onChange={(e) => setShowPassword(e.target.checked)}
                                    />

                                    <label className='ms-2' style={{ userSelect: 'none', cursor: 'pointer' }} htmlFor="showPass">{showPassword ? 'Hide Password' : 'Show Password'}</label>
                                </div>

                            </div>

                        </div>
                        <div className='update-profile-button-container'>
                            <button className='update-profile-button' type='submit'>Change Password</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;