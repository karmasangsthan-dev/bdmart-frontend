import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CartFlottingButton = () => {
  const router = useRouter();
  const { cart } = useSelector((state) => state?.cart);
  const { cartProducts } = useSelector((state) => state?.cart);
  const [total, setTotal] = useState(0);
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  let totalProductQuantity = 0;

  for (const item of cart) {
    totalProductQuantity += item.quantity;
  }
  const calculateTotal = () => {
    let total = 0;
    cart?.forEach((cartItem) => {
      const quantity = cartItem?.quantity;
      total += cartItem.price * quantity;
    });
    setTotal(total.toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  }, [cart, cartProducts]);

  return (
    <button
      onClick={() => router.push('/cart')}
      className="cart-flot-container"
    >
      <div className="cart-content">
        <div className="first-content">
          <span className="item-number">
            <svg
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
                d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
              />
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M160 224v16a96 96 0 0096 96h0a96 96 0 0096-96v-16"
              />
            </svg>
          </span>
          <span className="item-number-text">{totalProductQuantity ? totalProductQuantity :'No'} Items</span>
        </div>
        <div className="second-content">
          {(total * currencyRate).toFixed(2)} {currency}
        </div>
      </div>
    </button>
  );
};

export default CartFlottingButton;
