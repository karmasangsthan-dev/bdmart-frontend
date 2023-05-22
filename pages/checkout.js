import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import CheckoutCartItem from "../components/Checkout/CheckoutCartItem";
import { toast } from "react-hot-toast";
import { useGetCreateOrderMutation } from "../features/product/productApi";

const checkout = () => {
    const router = useRouter();
    const [coupon, setCoupon] = useState('');
    const [getCreateOrder, { data, isLoading, isSuccess ,isError}] =
        useGetCreateOrderMutation();
    const user = useSelector((state) => state?.auth?.user);
    const { cart } = useSelector((state) => state?.cart);
    const { cartProducts } = useSelector((state) => state?.cart);

    const calculateTotal = () => {
        let total = 0;
        cart.forEach((cartItem) => {
            const quantity = cartItem?.quantity;
            const product = cartProducts?.find((p) => p?._id === cartItem?.id);
            if (product?.price && quantity) {
                total += product.price * quantity;
            }
        });
        return total.toFixed(2);
    };
    const handleCouponSubmit = (event) => {
        event.preventDefault();
        toast.success('Coupon added');
        const form = event.target;
        form.reset();
        form.blur();
        document.activeElement.blur();
    }

    // Combine product data with quantity
    const productsWithQuantity = cartProducts?.map((product) => {
        const quantityObj = cart.find((item) => item.id === product._id);
        const quantity = quantityObj ? quantityObj.quantity : 0;

        return {
            ...product,
            quantity
        };
    });
    const handleCreateOrder = (event) => {
        event.preventDefault();
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const fullName = firstName + ' ' + lastName;
        const companyName = event.target.companyName.value;
        const country = event.target.country.value;
        const street = event.target.street.value;
        const street2 = event.target.street2.value;
        const city = event.target.city.value;
        const state = event.target.state.value;
        const postcode = event.target.postcode.value;
        const phone = event.target.phone.value;
        const email = event.target.email.value;
        const orderData = { name: fullName, companyName, country, street, street2, city, state, postcode, phone, billingEmail: email, userEmail: user?.email, products: productsWithQuantity }
        getCreateOrder(orderData);

    }
    useEffect(() => {
        if (isLoading) {
            toast.loading("Loading...", { id: "createOrder" });
        }

        if (isSuccess) {
            toast.success("Successfully created Order...!!", { id: "createOrder" });
            router.push('/profile/order-history')
        }
        
    }, [isLoading, isSuccess, isError]);



    return (
        <Layout title="Checkout - Bangladesh Mart">
            <div style={{ minHeight: '120vh' }}>
                <div className="container checkout-container">
                    <div class="checkout-discount">
                        <form onSubmit={handleCouponSubmit} id="checkout-discount-form">
                            <input onChange={(e) => setCoupon(e.target.value)} type="text" class="form-control" required="" id="checkout-discount-input" name="coupon" />
                            {!coupon && <label for="checkout-discount-input" class="text-truncate">Have a coupon? <span>Click here to enter your code</span>
                            </label>}
                        </form>
                    </div>
                    <form onSubmit={handleCreateOrder}>
                        <div className="row">
                            <div className="col-md-4 order-md-2 mb-4">
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-muted">Your Cart</span>

                                </h4>
                                <ul style={{ marginTop: '2.5rem ' }} className="list-group mb-3 ">

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
                                    type="submit"
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
                                        <input type="text" className="form-control" name="firstName" placeholder="" required />

                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label for="lastName">Last name *</label>
                                        <input type="text" className="form-control" name="lastName" placeholder="" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="email">Company Name (Optional)</label>
                                    <input name="companyName" type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="email">Country *</label>
                                    <input name="country" type="text" className="form-control" required />
                                </div>

                                <div className="mb-3">
                                    <label for="address">Street Address *</label>
                                    <input name="street" type="text" className="form-control" placeholder="House number and Street name" required />
                                    <input name="street2" type="text" className="form-control mt-2" placeholder="Appartments, suite, unit etc ..." required />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="">
                                            <label for="city">Town / City *</label>
                                            <input id="city" name="city" type="text" className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="col-md-6 ">

                                        <div className="mt-2">
                                            <label for="email">State *</label>
                                            <input name="state" type="text" className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="mb-2">
                                            <label for="postcode">Postcode / ZIP *</label>
                                            <input name="postcode" type="text" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6 ">
                                        <div className="">
                                            <label for="phone">Phone *</label>
                                            <input name="phone" type="text" className="form-control" required />
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-3">
                                    <label for="email">Email Address*</label>
                                    <input name="email" type="text" className="form-control" required />
                                </div>


                            </div>


                        </div>
                    </form>
                </div >
            </div >
        </Layout>


    );
};

export default checkout;
