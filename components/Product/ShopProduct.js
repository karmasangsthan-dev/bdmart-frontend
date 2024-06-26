import { Rating } from "@mui/material";

import { useRouter } from "next/router";
import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { useHandleAddToCart } from "../../helperHooks/handleAddToCart";
import {
  getProductPriceRangeDetails,
  getProductPriceRangeForCard,
  getShopPageProductDiscountLowestHighestPrice,
} from "../../helperHooks/getProductPriceRange";

export default function ShopProduct({ product }) {
  const dispatch = useDispatch();
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  // const productHighestPrice = getProductPriceRangeForCard(
  //   product?.variants,
  //   currencyRate
  // ).highestPrice;

  // const productLowestPrice = getProductPriceRangeForCard(
  //   product?.variants,
  //   currencyRate
  // ).lowestPrice;

  const { highestPrice: productHighestPrice, lowestPrice: productLowestPrice } = getProductPriceRangeDetails(
    product
  );

  const { oldLowestPrice, oldHighestPrice } =
    getShopPageProductDiscountLowestHighestPrice(product?.variants);

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

  console.log({ variant: product?.variants });

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
                  {(productLowestPrice * currencyRate).toFixed(2)} {currency}
                </span>{" "}
                -{" "}
                <span className="item-price pl-2">
                  {(productHighestPrice * currencyRate).toFixed(2)} {currency}
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
            {(oldLowestPrice * currencyRate).toFixed(2)} {currency}
          </del>
          {" - "}
          <del>
            {(oldHighestPrice * currencyRate).toFixed(2)} {currency}
          </del>
        </div>
        <div className="d-flex align-items-center">
          <Rating
            style={{ fontSize: "15px", marginLeft: "-3px" }}
            name="read-only"
            value={Math.floor(product?.averageRating || 0)}
            readOnly
          />
          <p className="mb-0 ms-1" style={{ fontSize: "13px" }}>
            ({Math.floor(product?.averageRating || 0)})
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
