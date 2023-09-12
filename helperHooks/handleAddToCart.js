import { toast } from 'react-hot-toast';
import {
  addToCart,
  increaseQuantity,
  increaseQuantityForCartProducts,
} from '../features/cart/cartSlice';

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
    const isAvailable = cart.find((item) => item.variantId === variantId);
    if (isAvailable) {
      const index = cart?.findIndex(
        (cartProduct) => cartProduct?.variantId === variantId
      );
      if (index !== -1) {
        cart[index].quantity = cart[index].quantity + quantity;
        localStorage.setItem('cartProducts', JSON.stringify(cart));
        dispatch(increaseQuantity({ id: variantId, quantity }));
        dispatch(increaseQuantityForCartProducts({ id: variantId, quantity }));
      }
      return toast.success('product quantity updated');
    }
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
