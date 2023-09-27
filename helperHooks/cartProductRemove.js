import {
  removeFromCart,
  removeFromCartProducts,
} from '../features/cart/cartSlice';

export const useHandleCartProductRemove = (product, dispatch) => {
  // const productId = product?.product?._id;
  // const userId = user?._id;
  const cartsString = localStorage.getItem('cartProducts');
  let cart = JSON.parse(cartsString);
  cart = cart.filter((item) => item?.variantId !== product?.variant?._id);
  localStorage.setItem('cartProducts', JSON.stringify(cart));
  dispatch(removeFromCart(product?.variant._id));
  dispatch(removeFromCartProducts(product?.variant?._id));
};
