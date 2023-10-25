import toast from 'react-hot-toast';
import {
  increaseQuantity,
  increaseQuantityForCartProducts,
} from '../features/cart/cartSlice';

export const useHandleCartProductInc = (item, dispatch) => {
  const cart = JSON.parse(localStorage.getItem('cartProducts'));
  const index = cart?.findIndex(
    (cartProduct) => cartProduct?.variantId === item?.variant?._id
  );
  if (index !== -1) {
    if (cart[index].quantity < 5) {
      cart[index].quantity += 1;
      localStorage.setItem('cartProducts', JSON.stringify(cart));
      dispatch(increaseQuantity({ id: item?.variant?._id, quantity: 1 }));
      dispatch(
        increaseQuantityForCartProducts({ id: item?.variant?._id, quantity: 1 })
      );
    }
    else {
      toast.error(
        "Sorry !! Quantity can't be add more.",
        {
          id: 'cartProduct',
        }
      );
    }
  }
  return;
};
