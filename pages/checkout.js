import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import CheckoutCartItem from "../components/Checkout/CheckoutCartItem";
import { toast } from "react-hot-toast";
import { useGetCreateOrderMutation } from "../features/product/productApi";
import { clearCart } from "../features/cart/cartSlice";
import RequireAuth from "../components/Shared/RequireAuth/RequireAuth";

const PaymentMethodRadio = ({ method, isSelected, onChange }) => {
  const handleChange = (method) => {
    onChange(method);
  };


  return (
    <div className="payment-method-radio">
      <label>
        <input
          type="radio"
          checked={isSelected}
          onChange={() => handleChange(method)}
        />
        <span className="radio-label">{method}</span>
      </label>
    </div>
  );
};

const checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [getCreateOrder, { data, isLoading, isSuccess, isError }] =
    useGetCreateOrderMutation();
  const user = useSelector((state) => state?.auth?.user);
  const { cart } = useSelector((state) => state?.cart);
  const { cartProducts } = useSelector((state) => state?.cart);
  const [selectedMethod, setSelectedMethod] = useState("");
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const calculateTotal = () => {
    let total = 0;
    cart?.forEach((cartItem) => {
      const quantity = cartItem?.quantity;
      const product = cartProducts?.find((p) => p?._id === cartItem?.id);

      if (product?.price && quantity) {
        total += product.price * quantity;
      }
    });
    return total * currencyRate?.toFixed(2);
  };
  const handleCouponSubmit = (event) => {
    event.preventDefault();
    toast.success("Coupon added");
    const form = event.target;
    form.reset();
    form.blur();
    document.activeElement.blur();
  };

  // Combine product data with quantity
  const productsWithQuantity = cartProducts?.map((product) => {
    const quantityObj = cart.find((item) => item.id === product._id);
    const quantity = quantityObj ? quantityObj.quantity : 0;

    return {
      ...product,
      quantity,
    };
  });
  const handleCreateOrder = (event) => {
    event.preventDefault();
    if (selectedMethod !== "") {
      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;
      const fullName = firstName + " " + lastName;
      const companyName = event.target.companyName.value;
      const country = event.target.country.value;
      const address = event.target.address.value;
      const city = event.target.city.value;
      const state = event.target.state.value;
      const postcode = event.target.postcode.value;
      const phone = event.target.phone.value;
      const email = event.target.email.value;

      const orderData = {
        name: fullName,
        companyName,
        country,
        address,
        city,
        state,
        postcode,
        phone,
        billingEmail: email,
        userEmail: user?.email,
        products: productsWithQuantity,
        paymentMethod: selectedMethod,
        currency,
        currencyRate
      };

      getCreateOrder(orderData);
    } else {
      toast.error("Please select a payment method at first");
    }
  };
  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "createOrder" });
    }

    if (isSuccess) {
      router.push("/profile/my-orders");
      toast.success("Successfully created Order...!!", { id: "createOrder" });
      dispatch(clearCart());
      localStorage.removeItem("cartProducts");
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <Layout title="Checkout - Bangladesh Mart">
      <div style={{ minHeight: "120vh" }}>
        <div className="container checkout-container">
          <div className="checkout-discount">
            <form onSubmit={handleCouponSubmit} id="checkout-discount-form">
              <input
                onChange={(e) => setCoupon(e.target.value)}
                type="text"
                className="form-control"
                required=""
                id="checkout-discount-input"
                name="coupon"
              />
              {!coupon && (
                <label for="checkout-discount-input" className="text-truncate">
                  Have a coupon? <span>Click here to enter your code</span>
                </label>
              )}
            </form>
          </div>
          <form onSubmit={handleCreateOrder}>
            <div className="row checkout-content">
              <div className="col-md-4 mb-4 order-2 order-md-2">
                <h4 className="your-cart-title">
                  Your Cart
                </h4>
                <ul
                  style={{ marginTop: "2.5rem " }}
                  className="list-group mb-3 "
                >
                  {cartProducts?.map((product, i) => {
                    return (
                      <CheckoutCartItem
                        key={i}
                        product={product}
                      ></CheckoutCartItem>
                    );
                  })}

                  <li className="list-group-item d-flex justify-content-between">
                    <span style={{ fontWeight: "bold" }}>Total:</span>
                    <strong>{calculateTotal()}  {currency}</strong>
                  </li>
                  <div className="select-payment-method mt-3">
                    <label className="fw-bold mb-2" for="">Select Your Payment Method : </label>
                    <PaymentMethodRadio
                      method="Credit Card"
                      isSelected={selectedMethod === "Credit Card"}
                      onChange={handleMethodChange}
                    />
                    <PaymentMethodRadio
                      method="PayPal"
                      isSelected={selectedMethod === "PayPal"}
                      onChange={handleMethodChange}
                    />
                    <PaymentMethodRadio
                      method="Apple Pay"
                      isSelected={selectedMethod === "Apple Pay"}
                      onChange={handleMethodChange}
                    />
                    <PaymentMethodRadio
                      method="Cash On Delivery"
                      isSelected={selectedMethod === "Cash On Delivery"}
                      onChange={handleMethodChange}
                    />
                  </div>
                </ul>

                {selectedMethod === "" && (
                  <button type="submit" className="place-order-btn btn mb-5">
                    Place Order
                  </button>
                )}
                {selectedMethod === "Cash On Delivery" && (
                  <button type="submit" className="place-order-btn btn mb-5">
                    Place Order
                  </button>
                )}
                {selectedMethod !== "" &&
                  selectedMethod !== "Cash On Delivery" ? (
                  <button type="submit" className=" btn btn-danger mb-5" disabled>
                    Not available. Please select another method...
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-md-8 order-1 order-md-1 billing-address">
                <h4 className="billing-address-title">Billing address</h4>
                <div className="row name">
                  <div className="col-md-6 mb-3">
                    <label for="firstName">First name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="lastName">Last name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Company Name (Optional)</label>
                  <input
                    name="companyName"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label>Country *</label>
                  <input
                    name="country"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label for="address">Street Address *</label>
                  <textarea
                    name="address"
                    type="text"
                    className="form-control"
                    placeholder="Enter your address"
                    required
                    cols="30"
                    rows="3"
                  ></textarea>
                </div>

                <div className="row second-input-group">
                  <div className="col-md-6 ">
                    <div className="">
                      <label for="city">Town / City *</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6 ">
                    <div className="mt-2">
                      <label>State *</label>
                      <input
                        name="state"
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row second-input-group">
                  <div className="col-md-6 ">
                    <div className="mb-2">
                      <label for="postcode">Postcode / ZIP *</label>
                      <input
                        name="postcode"
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="">
                      <label for="phone">Phone *</label>
                      <input
                        name="phone"
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label for="email">Email Address*</label>
                  <input
                    readOnly
                    disabled
                    name="email"
                    type="text"
                    id="email"
                    className="form-control checkout-email-input"
                    value={user?.email}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RequireAuth(checkout)
