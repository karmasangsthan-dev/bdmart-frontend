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

    if (orderLoading) {
        return (
            <div>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="spinner1"></div>
                </div>
            </div>
        )
    }


    return (
        <>
            {
                data?.length > 0 ? <div className="dash-order-table">
                    <div style={{ borderRadius: "0.375rem" }}>
                        <div className='d-flex ' style={{ flexDirection: 'column' }}>
                            <h3 className='recent-order-title'>My Orders</h3>
                            <div className="order-table-container">
                                <div className="table-con">
                                    <div className="con">
                                        <table className='table-order'>
                                            <thead>
                                                <tr style={{ backgroundColor: 'rgb(243 244 246/1)', borderColor: 'rgb(229 231 235/1)', borderWidth: '1px' }}>
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
                                                                <td className='order-date-details'><span onClick={() => router.push(`/order/${order?._id}`)} className='order-details-btn'>Details</span></td>
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
                </div> :
                    <div>
                        <div className='d-flex justify-content-center' style={{color:'rgb(16 185 129/1)'}}>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="60px" width="60px" xmlns="http://www.w3.org/2000/svg"><path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"></path></svg>
                        </div>
                        <h3 className='text-center'>You Have no order Yet!</h3>
                    </div>
            }
        </>
    );
};

export default MyOrders;