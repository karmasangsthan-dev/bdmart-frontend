import { toast } from 'react-hot-toast';
import { addToCart } from '../features/cart/cartSlice';

export const useHandleAddToCart = ({
  product,
  variantId,
  quantity,
  selectedSize,
  dispatch,
}) => {
  const cartProducts = localStorage.getItem('cartProducts');
  if (cartProducts) {
    const cart = JSON.parse(localStorage.getItem('cartProducts'));

    cart.push({
      id: product?._id,
      variantId,
      size: selectedSize,
      quantity: quantity ? quantity : 1,
    });

    localStorage.setItem('cartProducts', JSON.stringify(cart));
    toast.success('Added to cart', { id: 'addToCart' });
  }
  if (!cartProducts) {
    const cart = [
      {
        id: product?._id,
        variantId,
        size: selectedSize,
        quantity: quantity ? quantity : 1,
      },
    ];
    localStorage.setItem('cartProducts', JSON.stringify(cart));
    toast.success('Added to cart', { id: 'addToCart' });
  }

  dispatch(
    addToCart({
      id: product?._id,
      variantId,
      size: selectedSize,
      quantity,
    })
  );
};
