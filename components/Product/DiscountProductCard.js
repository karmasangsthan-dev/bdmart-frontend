import { Rating } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';

import { getProductPriceRange } from '../../helperHooks/getProductPriceRange';
import {
  handleAddToCart,
  useHandleAddToCart,
} from '../../helperHooks/handleAddToCart';

export default function DiscountProductCard({ product }) {
  const dispatch = useDispatch();
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  const productHighestPrice = getProductPriceRange(
    product?.variants,
    currencyRate
  ).highestPrice;
  const productLowestPrice = getProductPriceRange(
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
    <div className="mb-3 mobile-product-card" key={product?._id}>
      <div className="product-link bestselling-product-container product-card-shop border p-3 rounded shadow">
        <div className="">
          <Image
            onClick={() => router.push(`/productDetails/${product._id}`)}
            layout="responsive"
            width={100}
            height={100}
            objectFit="contain"
            alt="Picture of the author"
            src={product?.thumbnail}
          />
        </div>
        <p
          onClick={() => router.push(`/productDetails/${product._id}`)}
          style={{ minHeight: '42px', cursor: 'pointer' }}
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
        <div className="old-price">
          {/* <del>
            {(product?.oldPrice * currencyRate).toFixed(2)} {currency}
          </del> */}
          {/* <span className="ms-2"> - {discountPercentage?.toFixed(2)}%</span> */}
        </div>
        <div className="d-flex align-items-center">
          <Rating
            style={{ fontSize: '15px', marginLeft: '-3px' }}
            name="read-only"
            value={parseInt(sanitizedAverageRating)}
            readOnly
          />
          <p className="mb-0 ms-1" style={{ fontSize: '13px' }}>
            ({parseInt(totalReviews)})
          </p>
        </div>
        <div id="">
          <button
            className="cart-btn w-100 "
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
            <i className="far plus-ico fa-plus-square text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
