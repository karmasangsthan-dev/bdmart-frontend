import { Rating } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function JustForYouProductCard({ product }) {
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  let productPrice;
  if (currencyRate) {
    productPrice = (product?.price * currencyRate).toFixed(2);
  }
  const discountPercentage =
    ((product?.oldPrice - product?.price) / product?.oldPrice) * 100;

  const dispatch = useDispatch();

  const router = useRouter();

  const handleAddToCart = (product) => {
    const cartProducts = localStorage.getItem('cartProducts');
    if (cartProducts) {
      const cart = JSON.parse(localStorage.getItem('cartProducts'));
      const index = cart?.findIndex(
        (cartProduct) => cartProduct?.id === product?._id
      );
      if (index !== -1) {
        cart[index].quantity += 1;
        toast.success('Updated Quantity', { id: 'addToCart' });
      } else {
        cart.push({ id: product?._id, quantity: 1, price: product?.price });
        toast.success('Added to cart', { id: 'addToCart' });
      }
      localStorage.setItem('cartProducts', JSON.stringify(cart));
    }
    if (!cartProducts) {
      const cart = [{ id: product?._id, quantity: 1, price: product?.price }];
      localStorage.setItem('cartProducts', JSON.stringify(cart));
      toast.success('Added to cart', { id: 'addToCart' });
    }

    dispatch(addToCart({ id: product?._id, price: product?.price }));
  };

  const { reviews } = product;
  const totalReviews = reviews?.length;
  const ratingsSum = reviews.reduce((sum, review) => sum + review.ratings, 0);
  const averageRating = totalReviews ? ratingsSum / totalReviews : 0;
  const sanitizedAverageRating = isNaN(averageRating) ? 0 : averageRating;

  const getProductPriceRange = (variants) => {
    let highestPrice = variants[0]?.price ? variants[0]?.price : 0;
    let lowestPrice = variants[0]?.price ? variants[0]?.price : 0;

    variants.forEach((variant) => {
      if (variant.price > highestPrice) {
        highestPrice = (variant.price * currencyRate).toFixed(2);
      }
      if (variant.price < lowestPrice) {
        lowestPrice = (variant.price * currencyRate).toFixed(2);
      }
    });

    return { highestPrice, lowestPrice };
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
          <span className="item-price">
            <div>
              <span className="item-price">{`${
                getProductPriceRange(product?.variants).lowestPrice
              } ${currency}`}</span>{' '}
              -
              <span className="item-price pl-2">{`${
                getProductPriceRange(product?.variants).highestPrice
              } ${currency}`}</span>
            </div>
          </span>
        </div>
        <div className="old-price">
          <del>
            {(product?.oldPrice * currencyRate).toFixed(2)} {currency}
          </del>
          <span className="ms-2"> - {discountPercentage?.toFixed(2)}%</span>
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
          {product?.variants?.length > 0 ? (
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
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
              <i class="fa-solid plus-ico fa-cart-shopping text-white"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
