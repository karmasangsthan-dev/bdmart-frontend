import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";

import { toast } from "react-hot-toast";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  removeFromCartProducts,
} from "../../features/cart/cartSlice";

export default function CartProductRow({ item: product }) {
  // const { product, quantity } = item || {};
  const { cart } = useSelector((state) => state.cart);
  const rowProduct = cart?.find((item) => item.id == product?._id);
  // const [token, setToken] = useState();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth?.user);
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   setToken(accessToken);
  // }, []);

  // const [removeCartProductMutation, { isSuccess, isLoading, isError, error }] =
  //   useRemoveCartProductMutation();

  const handleQuantityIncrement = (item) => {
    // const productId = item?._id;
    // const userId = user?._id;
    // const data = { productId, userId, token, handleQuantityType: "increment" };
    // dispatch(
    //   incCartProductQuantity({
    //     _id: productId,
    //     quantity: item.quantity,
    //     product: item,
    //   })
    // );

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
      <td>
        <div style={{ width: "50px", height: "auto" }}>
          <Image
            layout="responsive"
            width={100}
            height={100}
            src={product?.thumbnail}
            className=" "
            alt=""
          />
        </div>
      </td>
      <td>
        <h6 className="text-capitalize">{product?.title?.slice(0, 35)}...</h6>
      </td>
      <td>{(product?.price - product?.discountPercentage).toFixed(2)} $</td>
      <td>
        <button
          onClick={() => handleQuantityDecrement(product)}
          style={{ padding: "0 3px", border: "none" }}
          className=""
        >
          -
        </button>
        <input
          style={{ width: "25px" }}
          className="text-center border-0"
          type="text"
          value={rowProduct?.quantity}
        />
        <button
          onClick={() => handleQuantityIncrement(product)}
          style={{ padding: "0 3px", border: "none" }}
        >
          +
        </button>
      </td>
      <td>
        ${" "}
        {(
          rowProduct?.quantity *
          (product?.price - product?.discountPercentage)
        ).toFixed(2)}
      </td>
      <td>
        <button
          onClick={() => handleRemove(product)}
          style={{ padding: "0 5px" }}
          className="text-danger border-0"
        >
          X
        </button>
      </td>
    </tr>
  );
}
