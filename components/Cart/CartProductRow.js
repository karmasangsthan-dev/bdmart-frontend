import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decCartProductQuantity,
  fetchUser,
  incCartProductQuantity,
  removeCartProduct,
} from "../../features/auth/authSlice";
import Image from "next/image";
import {
  useHandleCartQuantityMutation,
  useRemoveCartProductMutation,
} from "../../features/auth/authApi";
import { toast } from "react-hot-toast";

export default function CartProductRow({ item }) {
  const { product, quantity } = item || {};

  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setToken(accessToken);
  }, []);

  const [removeCartProductMutation, { isSuccess, isLoading, isError, error }] =
    useRemoveCartProductMutation();

  const handleQuantityIncrement = (item) => {
    const productId = item?._id;
    const userId = user?._id;
    const data = { productId, userId, token, handleQuantityType: "increment" };
    dispatch(
      incCartProductQuantity({
        _id: productId,
        quantity: item.quantity,
        product: item,
      })
    );
  };
  const handleQuantityDecrement = (item) => {
    const productId = item?._id;
    const userId = user?._id;
    const data = { productId, userId, token, handleQuantityType: "decrement" };
    dispatch(
      decCartProductQuantity({
        _id: productId,
        quantity: item.quantity,
        product: item,
      })
    );
  };

  const handleRemove = (product) => {
    const productId = product?.product?._id;
    const userId = user?._id;

    removeCartProductMutation({ token, productId, userId });
  };
  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "cartClear" });
    }
    if (isSuccess) {
      dispatch(removeCartProduct(item));
      toast.success("Successfully removed.", { id: "cartClear" });
    }
  }, [isLoading, isSuccess]);

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
        <h6 className="text-capitalize">{product?.title}</h6>
      </td>
      <td>{(product?.price - product?.discountPercentage).toFixed(2)} $</td>
      <td>
        <button
          onClick={() => handleQuantityDecrement(item)}
          style={{ padding: "0 3px", border: "none" }}
          className=""
        >
          -
        </button>
        <input
          style={{ width: "25px" }}
          className="text-center border-0"
          type="text"
          value={quantity}
        />
        <button
          onClick={() => handleQuantityIncrement(item)}
          style={{ padding: "0 3px", border: "none" }}
        >
          +
        </button>
      </td>
      <td>
        ${" "}
        {(quantity * (product?.price - product?.discountPercentage)).toFixed(2)}
      </td>
      <td>
        <button
          onClick={() => handleRemove(item)}
          style={{ padding: "0 5px" }}
          className="text-danger border-0"
        >
          X
        </button>
      </td>
    </tr>
  );
}
