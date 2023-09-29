import React from "react";
import { useSelector } from "react-redux";

const CheckoutCartItem = ({ product }) => {
  const { cart } = useSelector((state) => state?.cart);
  const { cartProducts } = useSelector((state) => state?.cart);
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  const rowProduct = cart?.find((item) => item.id == product?._id);
  return (
    <div className="main-product-div">
      <div className="checkout-product">
        <img
          src={product?.variant?.image}
          width={40}
          height={40}
          alt={product?.title}
        />
      </div>
      <div className="checkout-product-content">
        <a
          className="checkout-product-link-button"
          href="/product/undefined"
        >
          {product?.title?.length > 30
            ? `${product?.title.slice(0, 35)}...`
            : product?.title}
        </a>
        <div className="d-flex justify-content-between">
          <p className="checkout-product-price">Item Price: {(product?.variant?.price * currencyRate).toFixed(2)}{" "} {currency} </p>
          <p className="checkout-product-price " style={{ color: 'black', fontWeight: 'bold' }}>x {product?.variant.quantity}</p>
        </div>


        <div className="d-flex align-items-center justify-content-between">
          <div className="main-price">
            <span>{(
              product?.variant?.price *
              currencyRate *
              product?.variant?.quantity
            ).toFixed(2)}{' '}
              {" "}
              {currency}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
