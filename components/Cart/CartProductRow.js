import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseQuantity,
  decreaseQuantityForCartProducts,
  increaseQuantity,
  increaseQuantityForCartProducts,
  removeFromCart,
  removeFromCartProducts,
} from '../../features/cart/cartSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

export default function CartProductRow({ product }) {
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  const dispatch = useDispatch();
  const router = useRouter();

  let productPrice;
  if (currencyRate) {
    productPrice = (product?.price * currencyRate).toFixed(2);
  }

  const handleQuantityIncrement = (item) => {
    const cart = JSON.parse(localStorage.getItem('cartProducts'));
    const index = cart?.findIndex(
      (cartProduct) => cartProduct?.variantId === item?.variant?._id
    );
    if (index !== -1) {
      cart[index].quantity += 1;
      localStorage.setItem('cartProducts', JSON.stringify(cart));
      dispatch(increaseQuantity(item?.variant?._id));
      dispatch(increaseQuantityForCartProducts(item?.variant?._id));
    }
  };
  const handleQuantityDecrement = (item) => {
    const cart = JSON.parse(localStorage.getItem('cartProducts'));
    const index = cart?.findIndex(
      (cartProduct) => cartProduct?.variantId === item?.variant?._id
    );
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem('cartProducts', JSON.stringify(cart));
        dispatch(decreaseQuantity(item?.variant?._id));
        dispatch(decreaseQuantityForCartProducts(item?.variant?._id));
      } else {
        toast.error(
          "Sorry !! Quantity can't be reduced more. You can remove the product.",
          {
            id: 'cartProduct',
          }
        );
      }
    }
  };

  const handleRemove = (product) => {
    // const productId = product?.product?._id;
    // const userId = user?._id;
    const cartsString = localStorage.getItem('cartProducts');
    let cart = JSON.parse(cartsString);
    cart = cart.filter((item) => item?.variantId !== product?.variant?._id);
    localStorage.setItem('cartProducts', JSON.stringify(cart));
    dispatch(removeFromCart(product?.variant._id));
    dispatch(removeFromCartProducts(product?.variant?._id));
  };

  return (
    <>
      <tr key={product?._id}>
        <td className="product-col ">
          <div className="d-flex align-items-center">
            <img
              className="cart-image"
              src={product?.thumbnail}
              alt="product"
            />
            <p
              title={product?.title}
              onClick={() => router.push(`/productDetails/${product._id}`)}
              className="product-title cart-product-title mb-0 ms-3"
            >
              {product?.title?.length > 30
                ? `${product?.title.slice(0, 35)}...`
                : product?.title}
            </p>
          </div>
        </td>
        <td className="quantity-col">
          <div
            style={{ height: '60px' }}
            className="product-quantity  d-flex align-items-center"
          >
            <div className="qty-container">
              <button
                onClick={() => handleQuantityDecrement(product)}
                className="qty-btn-minus btn-light"
                type="button"
              >
                <i className="fa fa-minus"></i>
              </button>
              <input
                type="text"
                name="qty"
                value={product?.variant.quantity}
                className="input-qty cart-input-qty"
              />
              <button
                onClick={() => handleQuantityIncrement(product)}
                className="qty-btn-plus btn-light"
                type="button"
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </td>
        <td className="" style={{ width: '50px' }}>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '60px' }}
          >
            <p
              style={{
                backgroundColor: `rgba(${product?.variant.color.r}, ${product?.variant?.color.g}, ${product?.variant?.color.b}, ${product?.variant?.color.a})`,
                width: '20px',
                height: '20px',
              }}
              className="product-select-color"
            ></p>
          </div>
        </td>
        <td>
          <p
            style={{ height: '60px', maxWidth: '40px' }}
            className="text-uppercase my-auto d-flex align-items-center justify-content-center"
          >
            {product?.variant?.size}
          </p>
        </td>
        <td className="cart-price-col">
          <p style={{ height: '60px' }} className=" cart-product-price">
            {(product?.variant?.price * currencyRate).toFixed(2)}
            <br /> {currency}
          </p>
        </td>
        <td className="total-col">
          <p className=" mb-0  cart-product-price" style={{ height: '60px' }}>
            {(
              product?.variant?.price *
              currencyRate *
              product?.variant?.quantity
            ).toFixed(2)}{' '}
            <br />
            {currency}
          </p>
        </td>
        <td className="remove-col">
          <div
            style={{ height: '60px' }}
            className="d-flex justify-content-center align-items-center"
          >
            <button
              style={{ maxHeight: '30px', minHeight: '30px', width: '30px' }}
              onClick={() => handleRemove(product)}
              className=" btn-remove-cart "
            >
              <i className="fa-solid fa-xmark delete-icon"></i>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
