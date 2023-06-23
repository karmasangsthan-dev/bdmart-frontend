import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllOrdersByEmailQuery } from '../../../features/product/productApi';

const MyOrders = () => {
    const user = useSelector((state) => state.auth.user);
    const router = useRouter();
    const { data, isLoading: orderLoading } = useGetAllOrdersByEmailQuery(
        user.email
    );

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


    return (
        <div className="dash-order-table">
            <div style={{ borderRadius: "0.375rem" }}>
                <div className='d-flex ' style={{ flexDirection: 'column' }}>
                    <h3 className='recent-order-title'>My Orders</h3>
                    <div className="order-table-container">
                        <div className="table-con">
                            <div className="con">
                                <table className='table-order'>
                                    <thead>
                                        <tr style={{ backgroundColor: 'rgb(243 244 246/1)', borderColor: 'rgb(229 231 235/1)',borderWidth:'1px' }}>
                                            <th>Id</th>
                                            <th>OrderTime</th>
                                            <th>Method</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Actions</th>
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
                                                        <td className='order-date-details'><span className='order-details-btn'>Details</span></td>
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
    );
};

export default MyOrders;