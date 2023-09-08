import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAddToCartMutation } from '../../features/auth/authApi';
import {
  addToCart,
  setCartProductsLocally,
} from '../../features/cart/cartSlice';
import { getProductPriceRangeForCard } from '../../helperHooks/getProductPriceRange';
import { useHandleAddToCart } from '../../helperHooks/handleAddToCart';

export default function Product({ product }) {
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
  const totalReviews = reviews?.length;
  const ratingsSum = reviews.reduce((sum, review) => sum + review.ratings, 0);
  const averageRating = totalReviews ? ratingsSum / totalReviews : 0;
  const sanitizedAverageRating = isNaN(averageRating) ? 0 : averageRating;

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
        <div className="item-price">
          {product?.variants?.length > 1 ? (
            <>
              <span className="item-price">
                {productLowestPrice} {currency}
              </span>{' '}
              -
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
      <div id="">
        <button
          className="cart-btn w-100 "
          onClick={() => productAddToCart(product)}
        >
          Add to Cart<i className="far plus-ico fa-plus-square text-white"></i>
        </button>
      </div>
    </div>
  );
}
