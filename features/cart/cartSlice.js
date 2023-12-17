import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  cart: [],
  cartProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addToCart: (state, { payload }) => {
    //   state.cart = [
    //     ...state.cart,
    //     { id: payload.id, quantity: payload.quantity },
    //   ];
    // },
    // incCartProductQuantity: (state, { payload }) => {
    //   state.cart = [
    //     ...state.cart.filter((product) => product?.id !== payload.id),
    //     state.cart.find(
    //       (product) =>
    //         product.id === payload.id && {
    //           ...product,
    //           quantity: product.quantity + 1,
    //         }
    //     ),
    //   ];
    // },

    addToCart: (state, action) => {
      const { id, quantity, variantId, size } = action.payload;
      state.cart?.push({
        id,
        variantId,
        size,
        quantity,
      });
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const index = state.cart?.findIndex((item) => item.variantId === id);

      if (index !== -1) {
        state.cart?.splice(index, 1);
      }
    },

    setCart: (state, action) => {
      const cartProducts = action.payload;
      state.cart = cartProducts;
    },
    increaseQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart?.find((item) => item.variantId === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      }
    },
    increaseQuantityForCartProducts: (state, action) => {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.cartProducts?.find(
        (item) => item.variant?._id === id
      );
      if (existingItem) {
        existingItem.variant.quantity += quantity;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart?.find((item) => item.variantId === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
      }
    },
    decreaseQuantityForCartProducts: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartProducts?.find(
        (item) => item.variant?._id === id
      );

      if (existingItem) {
        if (existingItem.variant.quantity > 1) {
          existingItem.variant.quantity -= 1;
        }
      }
    },

    setCartProducts: (state, action) => {
      const cartProducts = action.payload;
      state.cartProducts = cartProducts;
    },

    removeFromCartProducts: (state, action) => {
      const id = action.payload;
      const index = state.cartProducts?.findIndex(
        (item) => item.variant?._id === id
      );
      if (index !== -1) {
        state.cartProducts?.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    // removeCartProduct: (state, { payload }) => {
    //   state.user = {
    //     ...state.user,
    //     cart: [
    //       ...state.user.cart.filter((product) => product?._id !== payload?._id),
    //     ],
    //   };
    // },
    // decCartProductQuantity: (state, { payload }) => {
    //   state.user = {
    //     ...state.user,
    //     cart: state.user.cart.map((product) =>
    //       product._id === payload._id
    //         ? {
    //             ...product,
    //             quantity: product.quantity - 1,
    //           }
    //         : product
    //     ),
    //   };
    // },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCart,
  setCartProducts,
  removeFromCartProducts,
  increaseQuantity,
  increaseQuantityForCartProducts,
  clearCart,
  decreaseQuantity,
  decreaseQuantityForCartProducts,
  setCartProductsLocally,
} = cartSlice.actions;

export default cartSlice.reducer;
