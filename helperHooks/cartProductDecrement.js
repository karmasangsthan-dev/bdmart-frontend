import { decreaseQuantity, decreaseQuantityForCartProducts } from "../features/cart/cartSlice";

 export const useHandleCartProductDec = (item, dispatch, toast) => {
 const cart = JSON.parse(localStorage.getItem('cartProducts'));
    const index = cart?.findIndex(
      (cartProduct) => cartProduct?.variantId === item?.variant?._id
    );
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem('cartProducts', JSON.stringify(cart));
        dispatch(decreaseQuantity(item?.variant?._id));
        dispatch(decreaseQuantityForCartProducts(item?.variant?._id));
      } else {
        toast.error(
          "Sorry !! Quantity can't be reduced more. You can remove the product.",
          {
            id: 'cartProduct',
          }
        );
      }
    }
};
