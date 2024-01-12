import { Rating } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';

import { getProductPriceRangeDetails, getProductPriceRangeForCard } from '../../helperHooks/getProductPriceRange';
import { useHandleAddToCart } from '../../helperHooks/handleAddToCart';

export default function JustForYouProductCard({ product }) {
  const dispatch = useDispatch();
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );


  const updatedVariants = [];

  for (let index = 0; index < product?.variants?.length; index++) {
    const variant = product.variants[index];

    if (variant) {
      const matchingColorVariant = updatedVariants.find(
        (v) =>
          v.color.r === variant.color.r &&
          v.color.g === variant.color.g &&
          v.color.b === variant.color.b &&
          v.color.a === variant.color.a
      );

      if (matchingColorVariant) {
        matchingColorVariant.sizes.push({
          size: variant.size,
          oldPrice: variant.oldPrice,
          price: variant.price,
          stock: variant.stock,
          status: variant.status,
          _id: variant?._id,
        });
      } else if (!matchingColorVariant) {
        const newVariant = {
          color: variant?.color,
          image: variant?.image,
          sizes: [
            {
              size: variant.size,
              oldPrice: variant.oldPrice,
              price: variant.price,
              stock: variant.stock,
              status: variant.status,
              _id: variant?._id,
            },
          ],
        };
        updatedVariants.push(newVariant);
      }
    }
  }
  const newProductStructure = {
    ...product,
    variants: updatedVariants,
  };



  const { highestPrice, lowestPrice } = getProductPriceRangeDetails(product
  );

  const router = useRouter();

  const { reviews } = product;
  const totalReviews = reviews?.length;

  const totalRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
  const averageRating = totalRatings / reviews.length;

  // Display average rating out of 5
  const averageRatingOutOf5 = averageRating.toFixed(1);

  const productAddToCart = (product) => {
    useHandleAddToCart({
      product,
      selectedSize: product?.variants[0]?.size,
      variantId: product?.variants[0]._id,
      quantity: 1,
      dispatch,
    });
  };
  return (
    <div className="mb-3" key={product?._id}>
      <div className="product-link bestselling-product-container product-card-shop border p-3 rounded-3 shadow">
        <div className="">
          <Image
            layout="responsive"
            width={100}
            height={100}
            objectFit="contain"
            onClick={() => router.push(`/productDetails/${product._id}`)}
            className=""
            style={{ width: '100%', height: '100%' }}
            src={product?.thumbnail}
            alt={product?.title}
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
            {product?.variants?.length > 0 ? product?.variants?.length === 1 ? <>
              <span className="item-price">
                {(lowestPrice * currencyRate).toFixed(2)} {currency}
              </span>
            </> : (
              <>
                <span className="item-price">
                  {(lowestPrice * currencyRate).toFixed(2)} {currency}
                </span>{' '}
                -{' '}
                <span className="item-price pl-2">
                  {(highestPrice * currencyRate).toFixed(2)} {currency}
                </span>
              </>
            ) : (
              <span className="item-price">
                <span style={{ color: 'red' }}>00.00</span> {currency}
              </span>
            )}
          </div>
        </div>
        <div className="old-price">
          {!product?.variants?.length > 1 ? (
            <>
              <del>
                {(product?.oldPrice * currencyRate).toFixed(2)} {currency}
              </del>
              {/* <span className="ms-2"> - {discountPercentage?.toFixed(2)}%</span> */}
            </>
          ) : (
            <div style={{ height: '18px' }}></div>
          )}
        </div>
        <div className="d-flex align-items-center">
          <Rating
            style={{ fontSize: '15px', marginLeft: '-3px' }}
            name="read-only"
            value={parseInt(averageRatingOutOf5 ? averageRatingOutOf5 : 0)}
            readOnly
          />
          <p className="mb-0 ms-1" style={{ fontSize: '13px' }}>
            ({parseInt(totalReviews)})
          </p>
        </div>
        <div id="">
          {product?.variants?.length > 1 ? (
            <button
              onClick={() => router.push(`/productDetails/${product?._id}`)}
              className="cart-btn-see-options w-100 "
            >
              Select options
              <i className="far plus-ico fa-plus-square text-white"></i>
            </button>
          ) : (
            <button
              className="cart-btn w-100 "
              onClick={() => productAddToCart(product)}
            >
              Add to Cart
              <i className="fa-solid plus-ico fa-cart-shopping text-white"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
