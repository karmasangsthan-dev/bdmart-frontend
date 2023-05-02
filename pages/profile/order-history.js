import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Shared/Header/Header';
import auth from '../../firebase.init';
import Loading from '../../components/Shared/Loading/Loading';
import Layout from '../../components/Layout';
import ProfileSideNav from '../../components/Profile/ProfileSideNav';

const orderHistory = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    return (
        <Layout title="Order History - Bangladesh Mart">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <ProfileSideNav />
                    </div>
                    <div className="col-md-9">
                        <div className="profile-content">
                            <div className="tab-pane fade show active" id="account-info">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2>Order History</h2>

                                </div>
                                <div className="row">
                                    <p>Your order history is empty.</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default orderHistory;