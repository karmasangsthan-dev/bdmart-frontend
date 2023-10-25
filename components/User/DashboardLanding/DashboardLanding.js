import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllOrdersByEmailQuery } from '../../../features/product/productApi';



const Dashboard = ({ orders: data }) => {
    const user = useSelector((state) => state.auth.user);
    const router = useRouter();

    console.log({ data });
    const formatDate = (dateString) => {
        if (!dateString) {
            return ""; // Fallback value when the date string is undefined or falsy
        }
        try {

            const dateObject = new Date(dateString);
            const options = {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            };
            const formattedDate = new Intl.DateTimeFormat("en-US", options).format(dateObject);

            return formattedDate;
        } catch (error) {
            console.error("Invalid date string:", dateString);
            return ""; // Fallback value if the date string is invalid
        }
    }

    const countOrderStatus = (status) => {
        const filteredOrders = data?.filter(order => order?.status === status);
        return filteredOrders?.length;
    };

    return (
        <div className="dashbord-content-preview">
            <div className="dash-overflow-hidden">
                <h2 className='dash-content-heading'>Dashboard</h2>
                <div className="dashboard-first-section">
                    <div className='d-flex ' style={{ height: "100%" }}>
                        <div className='dash-heading-details-icon'>
                            <div className='child'>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            </div>
                            <div className="child-2">
                                <h5>Total Order</h5>
                                <p>{data?.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex ' style={{ height: "100%" }}>
                        <div className='dash-heading-details-icon'>
                            <div className='child pending-order'>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                            </div>
                            <div className="child-2">
                                <h5>Pending Order</h5>
                                <p>{countOrderStatus('pending')}</p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex ' style={{ height: "100%" }}>
                        <div className='dash-heading-details-icon'>
                            <div className='child processing-order'>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </div>
                            <div className="child-2">
                                <h5>Processing Order</h5>
                                <p>{countOrderStatus('processing')}</p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex ' style={{ height: "100%" }}>
                        <div className='dash-heading-details-icon'>
                            <div className='child success-order'>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div className="child-2">
                                <h5>Complete Order</h5>
                                <p>{countOrderStatus('successful')}</p>
                            </div>
                        </div>
                    </div>

                </div>
                {
                    data?.length > 0 ? (
                        <div className="dash-order-table">
                            <div style={{ borderRadius: "0.375rem" }}>
                                <div className='d-flex ' style={{ flexDirection: 'column' }}>
                                    <h3 className='recent-order-title'>Recent Order</h3>
                                    <div className="order-table-container">
                                        <div className="table-con">
                                            <div className="con">
                                                <table className='table-order'>
                                                    <thead>
                                                        <tr style={{ backgroundColor: 'rgb(243 244 246/1)' }}>
                                                            <th>Id</th>
                                                            <th>OrderTime</th>
                                                            <th>Method</th>
                                                            <th>Status</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data?.map((order, index) => {
                                                                let totalAmount = 0;
                                                                for (let i = 0; i < order?.products?.length; i++) {
                                                                    totalAmount =
                                                                        totalAmount + order?.products[i].quantity * order?.products[i].price;
                                                                };
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className='order-id'><span>#{order?.invoiceId ? order?.invoiceId : 'Not Found'}</span></td>
                                                                        <td className='order-date'><span>{formatDate(order?.createdAt)}</span></td>

                                                                        <td className='order-date'><span>{order?.paymentMethod?.split(' ')[0]}</span></td>
                                                                        <td className='order-date'><span>{order?.status}</span></td>
                                                                        <td className='order-date'><span>${totalAmount}</span></td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className='d-flex justify-content-center' style={{ color: 'rgb(16 185 129/1)' }}>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg"><path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"></path></svg>
                            </div>
                            <h4 className='text-center'>You Have no order Yet!</h4>
                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default Dashboard;