import { toast } from 'react-hot-toast';
import { addToCart } from '../features/cart/cartSlice';

export const useHandleAddToCart = ({
  product,
  variant,
  quantity,
  selectedSize,
  dispatch,
}) => {
  if (product?.variants?.length > 1) {
    return toast.error('Please select a size');
  }
  const cartProducts = localStorage.getItem('cartProducts');
  if (cartProducts) {
    const cart = JSON.parse(localStorage.getItem('cartProducts'));
    const index = cart?.findIndex(
      (cartProduct) => cartProduct?.id === product?._id
    );
    if (index !== -1) {
      cart[index]?.variants?.push({
        variantId: variant?._id,
        size: selectedSize,
        quantity,
      });
      toast.success('Updated Quantity', { id: 'addToCart' });
    } else {
      cart.push({
        id: product?._id,

        variants: [
          {
            variantId: variant?._id,
            size: selectedSize,
            quantity: 1,
          },
        ],
      });
      toast.success('Added to cart', { id: 'addToCart' });
    }
    localStorage.setItem('cartProducts', JSON.stringify(cart));
  }
  if (!cartProducts) {
    const cart = [
      {
        id: product?._id,
        variants: [
          { variantId: variant?._id, size: selectedSize, quantity: 1 },
        ],
      },
    ];
    localStorage.setItem('cartProducts', JSON.stringify(cart));
    toast.success('Added to cart', { id: 'addToCart' });
  }

  dispatch(
    addToCart({
      id: product?._id,
      variantId: variant?._id,
      size: selectedSize,
      quantity,
    })
  );
  return;
};
