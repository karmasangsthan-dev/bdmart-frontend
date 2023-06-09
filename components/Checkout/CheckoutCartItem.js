import React from "react";
import { useSelector } from "react-redux";

const CheckoutCartItem = ({ product }) => {
  const { cart } = useSelector((state) => state?.cart);
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  const rowProduct = cart?.find((item) => item.id == product?._id);
  return (
    <>
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0 text-capitalize">{product?.title} </h6>
          <small className="text-muted">Description</small>
        </div>
        <span className="text-muted">
          {product?.price * currencyRate?.toFixed(2) * rowProduct?.quantity} {currency}
        </span>
      </li>
    </>
  );
};

export default CheckoutCartItem;
