import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import ReactToPrint from "react-to-print";
import Layout from "../../components/Layout";
import { useGetSingleOrderByIdQuery } from "../../features/product/productApi";
import Footer from "../../components/Shared/Footer/Footer";
import Loading from "../../components/Shared/Loading/Loading";
import axios from "axios";

export async function getServerSideProps(context) {
    
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/order/order/${context.params.order}`
        const response = await axios.get(url);
        const order = response.data;
        console.log({ url });
        return {
            props: {
                orderData: order,
            },
        };
    } catch (error) {
        return {
            props: {
                orderData: { error: 'API Request Error' },
            },
        };
    }
}


const Order = ({ orderData: data }) => {
    const router = useRouter();
    const componentRef = useRef();
    const dispatch = useDispatch();
    console.log({ data });


    // const { data, isLoading: orderLoading } = useGetSingleOrderByIdQuery(order);
    let totalAmount = 0;
    for (let i = 0; i < data?.products?.length; i++) {
        totalAmount =
            totalAmount + data.products[i].quantity * data.products[i].price;
    }

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
        <Layout title="Invoice - Bangladesh Mart">
            {1 == 2 ? (
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="spinner1"></div>
                </div>
            ) : (
                <div className="invoice-container" style={{ height: "120vh" }}>
                    <div className="mx-5 px-5 mt-4 rounded-2 py-2" style={{ backgroundColor: "rgb(209 250 229/1)" }}>

                        {data?.paid === true ? <label>Thank you <span style={{ color: 'rgb(5 150 105/1)', fontWeight: '700' }}>{data?.name.charAt(0).toUpperCase() + data?.name.substring(1)}</span>, Your payment has been successfully processed and your order has been confirmed</label> : <label>Thank you <span style={{ color: 'rgb(5 150 105/1)', fontWeight: '700' }}>{data?.name}</span>, Your order have been received !</label>}
                    </div>
                    <div id="invoice-content " >

                        <div ref={componentRef}
                            className="order-container mx-5 px-5 my-4 py-4 rounded-2"
                            style={{ backgroundColor: "rgb(238 242 255/1)" }}
                        >
                            <div className="d-flex justify-content-between pb-3">
                                <div>
                                    <h4>INVOICE</h4>
                                    <span style={{ fontWeight: "bold" }}>
                                        STATUS{" "}
                                        {
                                            data?.status === 'successful' && <span
                                                style={{
                                                    borderRadius: "9999px",
                                                    color: "white",
                                                    fontSize: ".75rem",
                                                }}
                                                className="ms-2 px-2 bg-success"
                                            >
                                                Successful
                                            </span>
                                        }
                                        {
                                            data?.status === 'confirmed' && <span
                                                style={{
                                                    borderRadius: "9999px",
                                                    color: "white",
                                                    fontSize: ".75rem",
                                                }}
                                                className="ms-2 px-2 bg-success"
                                            >
                                                Confirmed
                                            </span>
                                        }
                                        {
                                            data?.status !== 'successful' && data?.status !== 'confirmed' && <span
                                                style={{
                                                    borderRadius: "9999px",
                                                    backgroundColor: "rgb(227 216 106)",
                                                    color: "rgba(194,120,3,1)",
                                                    fontSize: ".75rem",
                                                }}
                                                className="ms-2 px-2 "
                                            >
                                                {data?.status}
                                            </span>
                                        }
                                    </span>
                                </div>
                                <div>
                                    <img
                                        style={{ marginRight: '-20px' }}
                                        src="https://res.cloudinary.com/dfcztmnvh/image/upload/v1687640964/_images_logo2-removebg-preview_jhkefd.png"
                                        alt="bd-mart"
                                        width={150}
                                    />
                                    <p className="text-end">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-4 align-items-start">
                                <div>
                                    <h6>DATE</h6>
                                    <p>{formatDate(data?.createdAt)}</p>
                                </div>
                                <div>
                                    <h6>INVOICE NO</h6>
                                    <p>#{data?.invoiceId}</p>
                                </div>
                                <div className="text-end">
                                    <h6>INVOICE TO</h6>
                                    <p>{data?.name}</p>
                                    <p>
                                        {data?.userEmail}, {data?.phone}
                                    </p>
                                    <p>{data?.address}</p>
                                    <p>
                                        {data?.city}, {data?.country}, {data?.postcode}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 ">
                                <Table
                                    responsive
                                    style={{
                                        background: "white",
                                    }}
                                    className="rounded-2"
                                >
                                    <thead className="" style={{ backgroundColor: "" }}>
                                        <tr>
                                            <th className="ps-3">SR.</th>
                                            <th>PRODUCT TITLE</th>
                                            <th>QUANTITY</th>
                                            <th>ITEM PRICE</th>
                                            <th>AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.products?.map((product, i) => (
                                            <tr className="" key={i}>
                                                <td className="ps-3">{i + 1}</td>
                                                <td>{product?.title}</td>
                                                <td>{product?.quantity}</td>
                                                <td>{product?.price} {data?.currency}</td>
                                                <td>{product?.price * product?.quantity} {data?.currency}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div
                                className="d-flex justify-content-between mt-5 align-items-start p-4 rounded-2"
                                style={{ background: "white" }}
                            >
                                <div>
                                    <h6>PAYMENT METHOD</h6>
                                    <p>{data?.paymentMethod === 'cashOnDelevery' && "Cash on delevery"}</p>
                                    <p>{data?.paymentMethod === 'onlinePay' && "Online Payment"}</p>
                                </div>
                                <div>
                                    <h6>SHIPPING COST</h6>
                                    <p>{data?.shippingCost ? data?.shippingCost?.toFixed(2) : '0.00'} {data?.currency}</p>
                                </div>
                                <div className="text-start">
                                    <h6>DISCOUNT</h6>
                                    <p>0.00 {data?.currency}</p>
                                </div>
                                <div className="text-start">
                                    <h6>TOTAL AMOUNT</h6>
                                    <p className="text-danger fw-bold">{totalAmount} {data?.currency}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-5 pb-5 d-flex justify-content-between">
                        <button className="btn btn-success">Download Invoice</button>
                        <ReactToPrint
                            trigger={() => (
                                <button className="btn btn-success">Print Invoice</button>
                            )}
                            content={() => componentRef.current}
                        />
                    </div>
                </div>
            )}

        </Layout>
    );
};

export default Order;
