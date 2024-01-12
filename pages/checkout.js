import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import CheckoutCartItem from "../components/Checkout/CheckoutCartItem";
import { toast } from "react-hot-toast";
import { useGetCreateOrderMutation } from "../features/product/productApi";
import { clearCart } from "../features/cart/cartSlice";
import RequireAuth from "../components/Shared/RequireAuth/RequireAuth";
import Link from "next/link";
import { useCartProductsTotal } from "../helperHooks/useCartProductsTotal";

const checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [getCreateOrder, { data, isLoading, isSuccess, isError }] =
    useGetCreateOrderMutation();
  const user = useSelector((state) => state?.auth?.user);
  const { cart } = useSelector((state) => state?.cart);
  const { cartProducts } = useSelector((state) => state?.cart);
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  const [couponData, setCouponData] = useState(null);

  const total = useCartProductsTotal(cartProducts);

  const orderTotalPriceForCheckout =
    Number(total * currencyRate).toFixed(2) -
    (couponData?.discountAmount ? couponData?.discountAmount : 0);

  const productsWithQuantity = cartProducts?.map((product) => {
    const quantityObj = cart.find((item) => item.id === product._id);
    const quantity = quantityObj ? quantityObj.quantity : 0;
    const { price, oldPrice, size, status, stock, _id, color, image } =
      product?.variant;

    return {
      quantity,
      title: product?.title,
      thumbnail: product?.thumbnail,
      price: Number(price * currencyRate).toFixed(2),
      oldPrice: Number(oldPrice * currencyRate).toFixed(2),
      color,
      image,
      size,
      status,
      stock,
      productId: product?._id,
      variantId: product?.variant?._id,
    };
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postcode: "",
    shippingMethod: "FedEx",
    selectedPaymentMethod: "cashOnDelevery",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const orderData = {
    name: formData?.firstName + " " + formData?.lastName,
    country: formData?.country,
    address: formData?.address,
    city: formData?.city,
    postcode: formData?.postcode,
    phone: formData?.phone,
    billingEmail: formData?.email,
    userEmail: user?.email,
    products: productsWithQuantity,
    paymentMethod: formData?.selectedPaymentMethod,
    currency,
    currencyRate,
    shippingCost: 20.0,
    totalPrice: orderTotalPriceForCheckout,
    coupon: couponData,
  };

  const handleOrderOnlinePay = async () => {
    if (currency === "BDT") {
      const data = {
        price: orderTotalPriceForCheckout,
        currency,
        currencyRate,
        orderData,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/payment/initiate-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      window.location.href = responseData?.url;
    } else {
      toast.error(
        "Please select BDT currency for payment. Others currency under development."
      );
    }
  };
  const handleOrderCOD = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/order/order`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (response.status === 200) {
      toast.success("Successfully created Order...!!", { id: "createOrder" });
      dispatch(clearCart());
      localStorage.removeItem("cartProducts");
      router.push("/user/my-orders");
    } else {
      // throw new Error(response.statusText);
      console.log({ response });
      toast.error(response.statusText, { id: 1 });
    }
  };

  // handle coupon
  const handleCouponSubmit = async (event) => {
    event.preventDefault();

    const code = event.target.coupon.value;
    const data = await couponValid(code);

    if (data?.currency === currency) {
      const { code, discountType, discountValue } = data;
      if (discountType === "percentage") {
        const discountAmount = calculateDiscountAmount(
          (total * currencyRate).toFixed(2),
          discountValue
        );
        const newCouponData = {
          code,
          discountType,
          discountAmount,
          discountValue,
          couponStatus: `Congratulations !! You have got ${discountValue}% discount`,
        };
        setCouponData(newCouponData);

        toast.success("Congratulations !! You have got 20% discount");
      }
    } else {
      toast.error("Invalid coupon");
    }
  };

  useEffect(() => {
    setCouponData({});
  }, [currency]);

  const calculateDiscountAmount = (originalPrice, discountPercentage) => {
    const discountAmount = parseInt(
      (discountPercentage * parseInt(originalPrice)) / 100
    );
    return discountAmount;
  };

  const couponValid = async (code) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/coupon/${code}`
    );
    const data = await response.json();

    if (data?.data) {
      return data?.data;
    }
    if (!data?.data) {
      setCouponData({});
      toast.error("Coupon not exist");
    }
  };

  return (
    <Layout title="Checkout - Bangladesh Mart">
      <div style={{ minHeight: "120vh", background: "rgb(249 250 251/1)" }}>
        <div className="checkout-container ">
          <div className="checkout-full-content">
            <div className="checkout-left-side">
              <div className="left-content">
                <div className="form-group">
                  <h2 className="checkout-personal-details">
                    01. Personal Details
                  </h2>
                  <div className="personal-content">
                    <div className="personal-input">
                      <label htmlFor="">First Name</label>
                      <div className="personal-relative">
                        <input
                          name="firstName"
                          className="form-control"
                          type="text"
                          placeholder="John"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="personal-input">
                      <label htmlFor="">Last Name</label>
                      <div className="personal-relative">
                        <input
                          className="form-control"
                          name="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="personal-input">
                      <label htmlFor="">Email address</label>
                      <div className="personal-relative">
                        <input
                          readOnly
                          disabled
                          name="email"
                          type="text"
                          id="email"
                          className="form-control checkout-email-input"
                          value={user?.email}
                        />
                      </div>
                    </div>
                    <div className="personal-input">
                      <label htmlFor="">Phone Number</label>
                      <div className="personal-relative">
                        <input
                          name="phone"
                          className="form-control"
                          type="tel"
                          placeholder="+062-6532956"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: "3rem" }}>
                  <h2 className="checkout-personal-details">
                    02. Shipping Details
                  </h2>
                  <div
                    className="personal-content"
                    style={{ marginBottom: "2rem" }}
                  >
                    <div className="personal-input-street">
                      <label htmlFor="">Street address</label>
                      <div className="personal-relative">
                        <input
                          name="address"
                          className="form-control"
                          type="text"
                          placeholder="123 Boulevard Rd, Beverley Hills"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="personal-input-city">
                      <label>City</label>
                      <div className="personal-relative">
                        <input
                          name="city"
                          className="form-control"
                          type="text"
                          placeholder="Los Angeles"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="personal-input-city">
                      <label htmlFor="">Country</label>
                      <div className="personal-relative">
                        <input
                          name="country"
                          className="form-control"
                          type="text"
                          placeholder="United States"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="personal-input-city">
                      <label htmlFor="">ZIP / Postal</label>
                      <div className="personal-relative">
                        <input
                          name="postcode"
                          className="form-control"
                          type="text"
                          placeholder="2345"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <label>Shipping Cost</label>
                  <div className="personal-content">
                    <div className="personal-input">
                      <div>
                        <div className="shipping-method">
                          <label className="">
                            <div className="shipping-content">
                              <div className="d-flex align-items-center">
                                <span className="ship">
                                  <svg
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="1"
                                      y="3"
                                      width="15"
                                      height="13"
                                    ></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle
                                      cx="18.5"
                                      cy="18.5"
                                      r="2.5"
                                    ></circle>
                                  </svg>
                                </span>
                                <div>
                                  <h6 className="shipping-method-title">
                                    FedEx
                                  </h6>
                                  <p
                                    style={{
                                      color: "rgb(107 114 128/1)",
                                      fontWeight: "500",
                                      fontSize: ".75rem",
                                      lineHeight: "1rem",
                                    }}
                                    className=""
                                  >
                                    Delivery: Today{" "}
                                    <span className="font-medium text-gray-600">
                                      Cost :$60.00
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <input
                                name="shippingMethod"
                                type="radio"
                                className="shipping-radio"
                                value="FedEx"
                                checked={formData.shippingMethod === "FedEx"}
                                onChange={handleInputChange}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="personal-input">
                      <div>
                        <div className="shipping-method">
                          <label className="">
                            <div className="shipping-content">
                              <div className="d-flex align-items-center">
                                <span className="ship">
                                  <svg
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="1"
                                      y="3"
                                      width="15"
                                      height="13"
                                    ></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle
                                      cx="18.5"
                                      cy="18.5"
                                      r="2.5"
                                    ></circle>
                                  </svg>
                                </span>
                                <div>
                                  <h6 className="shipping-method-title">UPS</h6>
                                  <p
                                    style={{
                                      color: "rgb(107 114 128/1)",
                                      fontWeight: "500",
                                      fontSize: ".75rem",
                                      lineHeight: "1rem",
                                    }}
                                  >
                                    Delivery: 7 Days{" "}
                                    <span className="font-medium text-gray-600">
                                      Cost :$20.00
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <input
                                name="shippingMethod"
                                type="radio"
                                className="shipping-radio"
                                value="UPS"
                                checked={formData.shippingMethod === "UPS"}
                                onChange={handleInputChange}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: "3rem" }}>
                  <h2 className="checkout-personal-details">
                    03. Payment Method
                  </h2>
                  <div className="personal-content">
                    <div className="personal-input ">
                      <div
                        className="shipping-method "
                        style={{ cursor: "pointer" }}
                      >
                        <label className="label">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between gap-2">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth={0}
                                viewBox="0 0 512 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M47.5 104H432V51.52a16 16 0 00-19.14-15.69l-368 60.48a16 16 0 00-12 10.47A39.69 39.69 0 0147.5 104zm416 24h-416a16 16 0 00-16 16v288a16 16 0 0016 16h416a16 16 0 0016-16V144a16 16 0 00-16-16zM368 320a32 32 0 1132-32 32 32 0 01-32 32z" />
                                <path d="M31.33 259.5V116c0-12.33 5.72-18.48 15.42-20 35.2-5.53 108.58-8.5 108.58-8.5s-8.33 16-27.33 16V128c18.5 0 31.33 23.5 31.33 23.5L84.83 236z" />
                              </svg>
                              <h6 className="select-method-text">
                                Cash On Delivery
                              </h6>
                            </div>

                            <input
                              id="cashOnDeliveryRadio"
                              name="selectedPaymentMethod"
                              type="radio"
                              className="shipping-radio"
                              value="cashOnDelevery"
                              checked={
                                formData.selectedPaymentMethod ===
                                "cashOnDelevery"
                              }
                              onChange={handleInputChange}
                            />
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="personal-input">
                      <div className="shipping-method">
                        <label className="cursor-pointer label">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between gap-2">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                version="1.1"
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path>
                              </svg>
                              <h6 className="select-method-text">Online Pay</h6>
                            </div>

                            <input
                              name="selectedPaymentMethod"
                              type="radio"
                              className="shipping-radio"
                              value="onlinePay"
                              checked={
                                formData.selectedPaymentMethod === "onlinePay"
                              }
                              onChange={handleInputChange}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkout-button-group">
                    <div className="personal-input">
                      <Link className="checkout-button-link" href="/">
                        <span style={{ width: "20px", height: "20px" }}>
                          <svg
                            style={{ verticalAlign: "unset" }}
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={32}
                              d="M112 160l-64 64 64 64"
                            />
                            <path
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={32}
                              d="M64 224h294c58.76 0 106 49.33 106 108v20"
                            />
                          </svg>
                        </span>
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="personal-input">
                      {formData.selectedPaymentMethod === "cashOnDelevery" && (
                        <button
                          onClick={handleOrderCOD}
                          className="confirm-order-button d-flex align-items-center gap-2"
                        >
                          Confirm Order
                          <span style={{ width: "20px", height: "20px" }}>
                            <svg
                              style={{ verticalAlign: "unset" }}
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 512 512"
                              height="20px"
                              width="20px"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={48}
                                d="M268 112l144 144-144 144m124-144H100"
                              />
                            </svg>
                          </span>
                        </button>
                      )}
                      {/* pay now btn  */}
                      {formData.selectedPaymentMethod === "onlinePay" && (
                        <button
                          onClick={handleOrderOnlinePay}
                          className="confirm-order-button d-flex align-items-center gap-2"
                        >
                          Pay Now
                          <span style={{ width: "20px", height: "20px" }}>
                            <svg
                              style={{ verticalAlign: "unset" }}
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 512 512"
                              height="20px"
                              width="20px"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={48}
                                d="M268 112l144 144-144 144m124-144H100"
                              />
                            </svg>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="checkout-right-side">
              <div className="order-summery-container">
                <h2 className="order-summery-title">Order Summary</h2>

                <div className="order-product-container">
                  {!cartProducts ? (
                    <p style={{ color: "blue" }}>Loading products...</p>
                  ) : (
                    cartProducts?.map((product, i) => {
                      return (
                        <CheckoutCartItem
                          key={i}
                          product={product}
                        ></CheckoutCartItem>
                      );
                    })
                  )}
                </div>

                <div className="coupon-container">
                  <form onSubmit={handleCouponSubmit} className="w-100">
                    <div className="coupon-content">
                      <input
                        name="coupon"
                        type="text"
                        placeholder="Input your coupon code"
                        className="form-control"
                      />
                      <button className="">Apply</button>
                    </div>
                    <div className="coupon-status">
                      {couponData?.couponStatus && (
                        <p>{couponData?.couponStatus}</p>
                      )}
                    </div>
                  </form>
                </div>

                <div className="checkout-subtotal">
                  Subtotal
                  <span className="">
                    {(total * currencyRate).toFixed(2)} {currency}
                  </span>
                </div>

                <div className="checkout-subtotal">
                  Shipping Cost
                  <span className="">20.00 {currency}</span>
                </div>
                <div className="checkout-subtotal-discount">
                  Discount
                  <span className="">
                    {couponData?.discountAmount
                      ? couponData?.discountAmount.toFixed(2)
                      : "0.00"}{" "}
                    {currency}
                  </span>
                </div>
                <div
                  className=" mt-4"
                  style={{
                    borderTopWidth: "1px",
                    borderColor: "#e5e7eb",
                    borderTopStyle: "solid",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: ".875rem",
                      lineHeight: "1.25rem",
                    }}
                    className="d-flex align-items-center font-serif justify-content-between pt-4 text-sm uppercase"
                  >
                    TOTAL COST
                    <span className="font-serif font-extrabold text-lg">
                      {orderTotalPriceForCheckout} {currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequireAuth(checkout);
