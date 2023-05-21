import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import CheckoutCartItem from "../components/Checkout/CheckoutCartItem";
import { toast } from "react-hot-toast";

const checkout = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state?.cart);
    const router = useRouter();
    const { cartProducts } = useSelector((state) => state?.cart);

    const calculateTotal = () => {
        let total = 0;
        cart.forEach((cartItem) => {
            const quantity = cartItem?.quantity;
            const product = cartProducts?.find((p) => p?._id === cartItem?.id);
            console.log({ product })
            if (product?.price && quantity) {
                total += product.price * quantity;
            }
        });
        return total.toFixed(2);
    };
    return (
        <Layout title="Checkout - Bangladesh Mart">
            <div style={{ minHeight: '120vh' }}>
                <div className="container checkout-container">
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your Cart</span>
                                
                            </h4>
                            <ul style={{marginTop:'2.5rem '}} className="list-group mb-3 ">

                                {
                                    cartProducts?.map((product, i) => {
                                        return (
                                            <CheckoutCartItem key={i} product={product} ></CheckoutCartItem>
                                        )
                                    })
                                }

                                <li className="list-group-item d-flex justify-content-between">
                                    <span style={{ fontWeight: 'bold' }}>Total (USD)</span>
                                    <strong>${calculateTotal()}</strong>
                                </li>
                            </ul>

                            <button
                                onClick={() => toast.success('Order booking successfully !!')}
                                className="place-order-btn btn"
                            >
                                Place Order
                            </button>

                        </div>
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Billing address</h4>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label for="firstName">First name *</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />

                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="lastName">Last name *</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="email">Company Name (Optional)</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="email">Country *</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="mb-3">
                                <label for="address">Street Address *</label>
                                <input type="text" className="form-control" placeholder="House number and Street name" required />
                                <input type="text" className="form-control mt-2" placeholder="Appartments, suite, unit etc ..." required />
                            </div>

                            <div className="row">
                                <div className="col-md-6 ">
                                    <div className="">
                                        <label for="email">Town / City *</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6 ">

                                    <div className="mt-2">
                                        <label for="email">Country *</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <div className="mb-2">
                                        <label for="email">Postcode / ZIP *</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="">
                                        <label for="email">Phone *</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>

                            </div>
                            <div className="mb-3">
                                <label for="email">Email Address*</label>
                                <input type="text" className="form-control" />
                            </div>

                        </div>


                    </div>
                </div >
            </div >
        </Layout>


    );
};

export default checkout;
