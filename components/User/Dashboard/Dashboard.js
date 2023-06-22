import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllOrdersByEmailQuery } from '../../../features/product/productApi';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const router = useRouter();
    const { data, isLoading: orderLoading } = useGetAllOrdersByEmailQuery(
        user.email
    );
    console.log({ data })

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
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
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
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
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
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
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
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div className="child-2">
                                <h5>Complete Order</h5>
                                <p>{countOrderStatus('successful')}</p>
                            </div>
                        </div>
                    </div>

                </div>
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
                                                        console.log(order)
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
            </div>

        </div>
    );
};

export default Dashboard;