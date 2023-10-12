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


  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cashOnDelevery');

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const total = useCartProductsTotal(cartProducts);

  // const calculateTotal = () => {
  //   let total = 0;
  //   cart?.forEach((cartItem) => {
  //     const quantity = cartItem?.quantity;
  //     const product = cartProducts?.find((p) => p?._id === cartItem?.id);
  //     if (product?.price && quantity) {
  //       total += product.price * quantity;
  //     }
  //   });
  //   return total.toFixed(2);
  // };

  const handleCouponSubmit = (event) => {
    event.preventDefault();
    const name = event.target.coupon.value;
    toast.error(`Your coupon was invalid`);

  };
  console.log({ cartProducts });

  // Combine product data with quantity
  const productsWithQuantity = cartProducts?.map((product) => {
    const quantityObj = cart.find((item) => item.id === product._id);
    const quantity = quantityObj ? quantityObj.quantity : 0;
    // Include other properties from the product
    console.log({ product, quantityObj });
    const { price, oldPrice, size, status, stock, _id, color, image } = product?.variant;

    return {
      quantity,
      title: product?.title,
      thumbnail: product?.thumbnail,
      price,
      oldPrice,
      color,
      image,
      size,
      status,
      stock,
      productId: product?._id,
      variantId: product?.variant?._id,
    };
  });
  const handleCreateOrder = (event) => {
    event.preventDefault();
    if (selectedPaymentMethod !== "") {
      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;
      const fullName = firstName + " " + lastName;
      const country = event.target.country.value;
      const address = event.target.address.value;
      const city = event.target.city.value;
      const postcode = event.target.postcode.value;
      const phone = event.target.phone.value;
      const email = event.target.email.value;

      const orderData = {
        name: fullName,
        country,
        address,
        city,
        postcode,
        phone,
        billingEmail: email,
        userEmail: user?.email,
        products: productsWithQuantity,
        paymentMethod: selectedPaymentMethod,
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
      toast.success("Successfully created Order...!!", { id: "createOrder" });
      dispatch(clearCart());
      localStorage.removeItem("cartProducts");
      router.push("/user/my-orders");
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <Layout title="Checkout - Bangladesh Mart">
      <div style={{ minHeight: "120vh", background: 'rgb(249 250 251/1)' }}>



        <div className="checkout-container ">
          <div className="checkout-full-content">
            <div className="checkout-left-side">
              <div className="left-content">
                <form onSubmit={handleCreateOrder}>
                  <div className="form-group">
                    <h2 className="checkout-personal-details">01. Personal Details</h2>
                    <div className="personal-content">
                      <div className="personal-input">
                        <label htmlFor="">First Name</label>
                        <div className="personal-relative">
                          <input name="firstName"
                            className="form-control"
                            type="text" placeholder="John" />
                        </div>
                      </div>
                      <div className="personal-input">
                        <label htmlFor="">Last Name</label>
                        <div className="personal-relative">
                          <input className="form-control" name="lastName" type="text" placeholder="Doe" />
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
                          <input name="phone" className="form-control" type="tel" placeholder="+062-6532956" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: "3rem" }}>
                    <h2 className="checkout-personal-details">02. Shipping Details</h2>
                    <div className="personal-content" style={{ marginBottom: '2rem' }}>
                      <div className="personal-input-street">
                        <label htmlFor="">Street address</label>
                        <div className="personal-relative">
                          <input name="address" className="form-control" type="text" placeholder="123 Boulevard Rd, Beverley Hills" />
                        </div>
                      </div>
                      <div className="personal-input-city">
                        <label>City</label>
                        <div className="personal-relative">
                          <input name="city" className="form-control" type="text" placeholder="Los Angeles" />
                        </div>
                      </div>
                      <div className="personal-input-city">
                        <label htmlFor="">Country</label>
                        <div className="personal-relative">
                          <input name="country" className="form-control" type="text" placeholder="United States" />
                        </div>
                      </div>
                      <div className="personal-input-city">
                        <label htmlFor="">ZIP / Postal</label>
                        <div className="personal-relative">
                          <input name="postcode" className="form-control" type="text" placeholder="2345" />
                        </div>
                      </div>

                    </div>


                    <label >Shipping Cost</label>
                    <div className="personal-content">
                      <div className="personal-input">
                        <div>
                          <div className="shipping-method">
                            <label className="">
                              <div className="shipping-content">
                                <div className="d-flex align-items-center">
                                  <span className="ship">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
                                    </svg>
                                  </span>
                                  <div>
                                    <h6 className="shipping-method-title">FedEx</h6>
                                    <p style={{
                                      color: "rgb(107 114 128/1)", fontWeight: '500', fontSize: ".75rem",
                                      lineHeight: "1rem"
                                    }} className="">Delivery: Today <span className="font-medium text-gray-600">Cost :$60.00</span>
                                    </p>
                                  </div>
                                </div>
                                <input name="shippingOption" type="radio" className="shipping-radio" value="FedEx" />
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
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
                                    </svg>
                                  </span>
                                  <div>
                                    <h6 className="shipping-method-title">UPS</h6>
                                    <p style={{
                                      color: "rgb(107 114 128/1)", fontWeight: '500', fontSize: ".75rem",
                                      lineHeight: "1rem"
                                    }}>Delivery: 7 Days <span className="font-medium text-gray-600">Cost :$20.00</span>
                                    </p>
                                  </div>
                                </div>
                                <input name="shippingOption" type="radio" className="shipping-radio" value="UPS" />
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: "3rem" }}>
                    <h2 className="checkout-personal-details">03. Payment Method</h2>
                    <div className="personal-content">
                      <div className="personal-input">
                        <div className="shipping-method">
                          <label className="cursor-pointer label">
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
                                <h6 className="font-serif font-medium text-sm text-gray-600">
                                  Cash On Delivery
                                </h6>
                              </div>

                              <input
                                name="shipping-method"
                                type="radio"
                                className="shipping-radio"
                                value="cashOnDelevery"
                                checked={selectedPaymentMethod === 'cashOnDelevery'}
                                onChange={handlePaymentMethodChange} />

                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="personal-input">
                        <div className="shipping-method">
                          <label className="cursor-pointer label">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center justify-content-between gap-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path></svg>
                                <h6 className="font-serif font-medium text-sm text-gray-600">
                                  Credit Card
                                </h6>
                              </div>

                              <input
                                name="shipping-method"
                                type="radio"
                                className="shipping-radio"
                                value="creditCard"
                                checked={selectedPaymentMethod === 'creditCard'}
                                onChange={handlePaymentMethodChange}
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
                        <Link
                          className="checkout-button-link"
                          href="/"
                        >
                          <span style={{ width: '20px', height: '20px' }}>
                            <svg
                              style={{ verticalAlign: 'unset' }}
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
                        <button
                          type="submit"
                          disabled=""
                          className="confirm-order-button d-flex align-items-center gap-2"
                        >
                          Confirm Order

                          <span style={{ width: '20px', height: '20px' }}>
                            <svg
                              style={{ verticalAlign: 'unset' }}
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
                      </div>
                    </div>

                  </div>

                </form>
              </div>
            </div>
            <div className="checkout-right-side">
              <div className="order-summery-container">
                <h2 className="order-summery-title">Order Summary</h2>

                <div className="order-product-container">

                  {
                    !cartProducts ? (
                      <p style={{ color: 'blue' }}>Loading products...</p>
                    ) : (
                      cartProducts?.map((product, i) => {
                        return (
                          <CheckoutCartItem key={i}
                            product={product} ></CheckoutCartItem>
                        )
                      })
                    )
                  }
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
                      <button className="">
                        Apply
                      </button>
                    </div>
                  </form>
                </div>


                <div className="checkout-subtotal">
                  Subtotal
                  <span className="">{(total * currencyRate).toFixed(2)} {currency}</span>
                </div>

                <div className="checkout-subtotal">
                  Shipping Cost
                  <span className="">
                    20.00{" "}{currency}
                  </span>
                </div>
                <div className="checkout-subtotal-discount">
                  Discount
                  <span className="">
                    $0.00
                  </span>
                </div>
                <div className=" mt-4" style={{ borderTopWidth: '1px', borderColor: "#e5e7eb", borderTopStyle: 'solid' }}>
                  <div style={{
                    fontWeight: '700', fontSize: ".875rem",
                    lineHeight: "1.25rem"
                  }} className="d-flex align-items-center font-serif justify-content-between pt-4 text-sm uppercase">
                    TOTAL COST
                    <span className="font-serif font-extrabold text-lg">{((Number(total * currencyRate)) + 20.00).toFixed(2)} {currency}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div >
      </div >
    </Layout >
  );
};

export default RequireAuth(checkout)
