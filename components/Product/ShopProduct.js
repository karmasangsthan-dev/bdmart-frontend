import { Collapse, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import { useAddToCartMutation } from "../../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/auth/authSlice";

export default function ShopProduct({ product }) {
  const [token, setToken] = useState();
  const [cartProduct, setCartProduct] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
  }, []);

  const [addProductToCart, { data, isSuccess, isLoading }] =
    useAddToCartMutation();
  const handleAddToCart = (product) => {
    const alreadyAdded = !!user?.cart?.find((item) =>
      item?.product?._id === product?._id ? true : false
    );
    console.log(alreadyAdded);
    if (user?.email) {
      if (alreadyAdded) {
        return toast.error("Product already added to cart!!!", {
          id: "addToCart",
        });
      }
      setCartProduct(product);
      addProductToCart({ token, userId: user?._id, product: product?._id });
    }
    if (!user?.email) {
      toast.error("Please, Login first !!!", { id: "addToCart" });
    }
    // if (!user?.email) {
    //   const cartProducts = localStorage.getItem("cartProducts");
    //   if (cartProducts) {
    //     const cart = JSON.parse(localStorage.getItem("cartProducts"));
    //     const index = cart?.findIndex(
    //       (item) => item?.product._id === product?._id
    //     );
    //     if (index !== -1) {
    //       cart[index].quantity += 1;
    //     } else {
    //       cart.push({ product, quantity: 1 });
    //     }
    //     localStorage.setItem("cartProducts", JSON.stringify(cart));
    //   }
    //   if (!cartProducts) {
    //     const cart = [{ product, quantity: 1 }];
    //     localStorage.setItem("cartProducts", JSON.stringify(cart));
    //   }
    // }
  };
  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "addToCart" });
    }
    if (isSuccess) {
      dispatch(addToCart(cartProduct));
      toast.success("Added to cart", { id: "addToCart" });
    }
  }, [isSuccess, isLoading]);
  return (
    <div
      key={product?.id}
      className="shop-single-product"
      // onClick={() => router.push(`/productDetails/${product._id}`)}
    >
      <figure className="product-media">
        <span className="product-label label-top">Top</span>
        {/* <Link style={{ marginTop: "-21px" }} href="/shop"> */}
        <div style={{ width: "217px", height: "217px", marginTop: "-18px" }}>
          <Image
            width={217}
            height={217}
            src={product?.thumbnail}
            className=""
            alt=""
          />

          <button
            onClick={() => handleAddToCart(product)}
            className="shop-add-to-cart-button"
          >
            Add to Cart
            <i class="far plus-ico fa-plus-square" aria-hidden="true"></i>
          </button>
        </div>
        {/* </Link> */}
      </figure>
      <div className="product-body mt-2">
        <div className="product-cat">
          <Link href="/shop/?category=fruit" className="text-capitalize">
            {product?.category}
          </Link>
        </div>
        <div className="product-title">
          <Link href="/shop/?category=fruit" className="text-capitalize">
            {product?.title}
          </Link>
        </div>
        <div className="product-price d-flex gap-2 justify-content-center">
          <div className="new-price">
            <p>${product?.price}</p>
          </div>
          <div className="shop-old-price">
            <p>$45</p>
          </div>
        </div>
        <div className="ratings-container mb-3">
          <div className="ratings">
            <Rating
              name="read-only"
              value={parseInt(product?.rating)}
              readOnly
            />
          </div>
          <div className="ratings-texts">( 2 Reviews )</div>
        </div>
      </div>
    </div>
  );
}
