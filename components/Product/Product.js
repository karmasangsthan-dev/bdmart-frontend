import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "../../features/auth/authApi";
import { addToCart } from "../../features/cart/cartSlice";

export default function Product({ product }) {
  // const [token, setToken] = useState();
  // const [cartProduct, setCartProduct] = useState({});
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth?.user);
  const router = useRouter();
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   setToken(token);
  // }, []);

  // const [addProductToCart, { data, isSuccess, isLoading }] =
  //   useAddToCartMutation();
  const handleAddToCart = (product) => {
    //   const alreadyAdded = !!user?.cart?.find(
    //     (item) => item?.product?._id === product?._id
    //   );
    //   console.log(alreadyAdded);
    //   if (user?.email) {
    //     if (alreadyAdded) {
    //       return toast.error("Product already added to cart!!!", {
    //         id: "addToCart",
    //       });
    //     }
    //     setCartProduct(product);
    //     addProductToCart({ token, userId: user?._id, product: product?._id });
    //   }
    //   if (!user?.email) {
    //     toast.error("Please, Login first !!!", { id: "addToCart" });
    //   }

    //   ----------------------------------------------------------

    const cartProducts = localStorage.getItem("cartProducts");
    if (cartProducts) {
      const cart = JSON.parse(localStorage.getItem("cartProducts"));
      const index = cart?.findIndex(
        (cartProduct) => cartProduct?.id === product?._id
      );
      if (index !== -1) {
        cart[index].quantity += 1;
        toast.success("Updated Quantity", { id: "addToCart" });
      } else {
        cart.push({ id: product?._id, quantity: 1 });
        toast.success("Added to cart", { id: "addToCart" });
      }
      localStorage.setItem("cartProducts", JSON.stringify(cart));
    }
    if (!cartProducts) {
      const cart = [{ id: product?._id, quantity: 1 }];
      localStorage.setItem("cartProducts", JSON.stringify(cart));
      toast.success("Added to cart", { id: "addToCart" });
    }

    dispatch(addToCart({ id: product?._id }));
  };
  // useEffect(() => {
  //   if (isLoading) {
  //     toast.loading("Loading...", { id: "addToCart" });
  //   }
  //   if (isSuccess) {
  //     dispatch(addToCart(cartProduct));
  //     toast.success("Added to cart", { id: "addToCart" });
  //   }
  // }, [isSuccess, isLoading]);
  return (
    <div className="product-link bestselling-product-container product border p-3 ms-3 mt-3 mb-4 me-3 rounded-3 shadow">
      <picture>
        <Image
          onClick={() => router.push(`/productDetails/${product._id}`)}
          src={product?.thumbnail}
          layout="responsive"
          width={1000}
          height={1000}
          alt="img"
        />
      </picture>
      <div className="main-detail">
        <div
          className="item-name"
          onClick={() => router.push(`/productDetails/${product._id}`)}
        >
          {product?.title?.length > 20
            ? `${product?.title?.slice(0, 18)}...`
            : product?.title}
        </div>
      </div>
      <div className="old-price">
        <del>{product?.oldPrice ? product?.oldPrice : 40}.00$</del>
      </div>
      <div className="save-price">
        {product?.savedPrice ? product?.savedPrice : 10}.00$
      </div>
      <div id="">
        <button
          className="cart-btn w-100 "
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart<i className="far plus-ico fa-plus-square text-white"></i>
        </button>
      </div>
    </div>
  );
}
