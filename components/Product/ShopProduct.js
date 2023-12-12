import { Rating } from "@mui/material";

import { useRouter } from "next/router";
import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { useHandleAddToCart } from "../../helperHooks/handleAddToCart";
import { getProductPriceRangeForCard } from "../../helperHooks/getProductPriceRange";

export default function ShopProduct({ product }) {
  const dispatch = useDispatch();
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  const productHighestPrice = getProductPriceRangeForCard(
    product?.variants,
    currencyRate
  ).highestPrice;
  const productLowestPrice = getProductPriceRangeForCard(
    product?.variants,
    currencyRate
  ).lowestPrice;

  const router = useRouter();

  const { reviews } = product;

  const totalRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
  const averageRating = totalRatings / reviews.length;
  
  // Display average rating out of 5
  const averageRatingOutOf5 = averageRating.toFixed(1);

  const productAddToCart = (product) => {
    useHandleAddToCart({
      product,
      selectedSize: product?.variants[0]?.size,
      variant: product?.variants[0],
      quantity: 1,
      dispatch,
    });
  };
  return (
    <div className="mb-1 w-100 shop-page-product" key={product?._id}>
      <div className="product-link bestselling-product-container  border p-3 rounded-3 shadow">
        <div className="">
          <img
            onClick={() => router.push(`/productDetails/${product._id}`)}
            className="border"
            style={{ width: "100%", height: "100%" }}
            src={product?.thumbnail}
            alt=""
          />
        </div>
        <p
          onClick={() => router.push(`/productDetails/${product._id}`)}
          style={{ minHeight: "42px", cursor: "pointer" }}
          className="item-name mt-2 mb-0 text-capitalize"
        >
          {product?.title?.length > 30
            ? `${product?.title?.slice(0, 30)} ...`
            : product?.title}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <div className="item-price">
            {product?.variants?.length > 1 ? (
              <>
                <span className="item-price">
                  {productLowestPrice} {currency}
                </span>{" "}
                -{" "}
                <span className="item-price pl-2">
                  {productHighestPrice} {currency}
                </span>
              </>
            ) : (
              <span className="item-price">
                {productLowestPrice} {currency}
              </span>
            )}
          </div>
        </div>
        <div className="old-price">
          <del>
            {(product?.oldPrice * currencyRate).toFixed(2)} {currency}
          </del>
          {/* <span className="ms-2"> - {discountPercentage?.toFixed(2)}%</span> */}
        </div>
        <div className="d-flex align-items-center">
          <Rating
            style={{ fontSize: "15px", marginLeft: "-3px" }}
            name="read-only"
            value={parseInt(averageRatingOutOf5 ? averageRatingOutOf5 : 0)}
            readOnly
          />
          <p className="mb-0 ms-1" style={{ fontSize: "13px" }}>
            ({Math.floor(reviews?.length || 0)})
          </p>
        </div>
        <div id="">
          <button
            className="cart-btn w-100 "
            onClick={() => productAddToCart(product)}
          >
            Add to Cart
            <i className="far plus-ico fa-plus-square text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
