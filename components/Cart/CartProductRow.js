import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  removeFromCartProducts,
} from "../../features/cart/cartSlice";
import { useRouter } from "next/router";

export default function CartProductRow({ product }) {
  const { cart } = useSelector((state) => state.cart);
  const rowProduct = cart?.find((item) => item.id == product?._id);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleQuantityIncrement = (item) => {


    const cart = JSON.parse(localStorage.getItem("cartProducts"));
    const index = cart?.findIndex(
      (cartProduct) => cartProduct?.id === item?._id
    );
    if (index !== -1) {
      cart[index].quantity += 1;
      localStorage.setItem("cartProducts", JSON.stringify(cart));
      dispatch(increaseQuantity(item?._id));
    }
  };
  const handleQuantityDecrement = (item) => {
    const cart = JSON.parse(localStorage.getItem("cartProducts"));
    const index = cart?.findIndex(
      (cartProduct) => cartProduct?.id === item?._id
    );
    if (index !== -1) {
      cart[index].quantity -= 1;
      localStorage.setItem("cartProducts", JSON.stringify(cart));
      dispatch(decreaseQuantity(item?._id));
    }
  };

  const handleRemove = (product) => {
    // const productId = product?.product?._id;
    // const userId = user?._id;
    const cartsString = localStorage.getItem("cartProducts");
    let cart = JSON.parse(cartsString);
    cart = cart.filter((item) => item?.id !== product?._id);
    localStorage.setItem("cartProducts", JSON.stringify(cart));
    dispatch(removeFromCart(product?._id));
    dispatch(removeFromCartProducts(product?._id));

    // removeCartProductMutation({ token, productId, userId });
  };
  // useEffect(() => {
  //   if (isLoading) {
  //     toast.loading("Loading...", { id: "cartClear" });
  //   }
  //   if (isSuccess) {
  //     dispatch(removeCartProduct(item));
  //     toast.success("Successfully removed.", { id: "cartClear" });
  //   }
  // }, [isLoading, isSuccess]);

  return (
    <tr key={product?._id}>
      <td class="product-col ">
        <div class="d-flex align-items-center">
          <img width={60} height={60} src={product?.thumbnail} alt="product" />
          <p title={product?.title} onClick={() => router.push(`/productDetails/${product._id}`)} class="product-title mb-0 ms-3">{product?.title.length > 30 ? `${product?.title.slice(0, 35)}...` : product?.title}</p>
        </div>
      </td>
      <td class="cart-price-col">
        <p style={{ height: '60px' }} className="d-flex align-items-center">${product?.price}</p>
      </td>
      <td class="quantity-col">
        <div style={{ height: '60px' }} class="product-quantity  d-flex align-items-center">
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
              value={rowProduct?.quantity}
              className="input-qty"
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
      <td class="total-col">
        <p className="mb-0 d-flex align-items-center" style={{ height: '60px' }}>${product?.price * rowProduct?.quantity}</p>
      </td>
      <td class="remove-col">
        <div style={{ height: '60px' }} className="d-flex justify-content-center align-items-center" >
          <button style={{ maxHeight: '30px', minHeight: '30px', width: '30px' }} onClick={() => handleRemove(product)} class=" btn-remove-cart "><i class="fa-solid fa-xmark delete-icon"></i></button>
        </div>
      </td>
    </tr>
  );
}
