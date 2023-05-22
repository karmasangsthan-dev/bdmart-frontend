import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Shared/Header/Header';
import auth from '../../firebase.init';
import Loading from '../../components/Shared/Loading/Loading';
import Layout from '../../components/Layout';
import ProfileSideNav from '../../components/Profile/ProfileSideNav';
import { useGetAllOrdersByEmailQuery } from '../../features/product/productApi';
import OrderCard from '../../components/Order/OrderCard';

const orderHistory = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);

    const { data, isLoading: orderLoading } = useGetAllOrdersByEmailQuery(user?.email);


    return (
        <Layout title="Order History - Bangladesh Mart">
            {
                isLoading ? (
                    <p>Loading..</p>
                ) : (
                    <div className="container" style={{minHeight:'120vh'}}>
                        <div className="row">
                            <div className="col-md-3">
                                <ProfileSideNav />
                            </div>
                            <div className="col-md-9" >
                                <div className="profile-content">
                                    <div className="tab-pane fade show active" id="account-info">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h2>Your Order: {data?.length}</h2>

                                        </div>
                                        <div>
                                            <div className="row">
                                                <div className="col-12">
                                                    {data?.map((order, index) => {
                                                        return (
                                                            <OrderCard order={order} key={index}></OrderCard>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div >
                    </div >
                )
            }
        </Layout >
    );
};

export default orderHistory;