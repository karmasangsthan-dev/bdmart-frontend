import { Collapse, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function ShopProduct({ product }) {
  return (
    <div key={product?.id} className="shop-single-product">
      <figure className="product-media">
        <span className="product-label label-top">Top</span>
        <Link style={{ marginTop: "-21px" }} href="/shop">
          <div style={{ width: "217px", height: "217px" }}>
            <Image
              width={217}
              height={217}
              src={product?.thumbnail}
              className=""
              alt=""
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                toast.success("product added in cart");
              }}
              className="shop-add-to-cart-button"
            >
              Add to Cart
              <i class="far plus-ico fa-plus-square" aria-hidden="true"></i>
            </button>
          </div>
        </Link>
      </figure>
      <div className="product-body">
        <div className="product-cat">
          <Link href="/shop/?category=fruit">{product?.category}</Link>
        </div>
        <div className="product-title">
          <Link href="/shop/?category=fruit">{product?.title}</Link>
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
