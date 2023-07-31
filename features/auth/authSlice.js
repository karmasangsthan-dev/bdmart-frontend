import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let initialState = {
  user: {
    cart: [],
  },
  cart: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: '',
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/user/me`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return data?.data;
});
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/user/socialLogin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();

    if (result?.status == 1) {
      localStorage.setItem('accessToken', result?.token);
      return result?.data;
    }
    // return data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = {
        email: '',
        role: '',
        cart: [],
      };
    },

    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = '';
    },
    addToCart: (state, { payload }) => {
      state.cart = [
        ...state.cart,
        { id: payload.id, quantity: payload.quantity },
      ];
    },
    incCartProductQuantity: (state, { payload }) => {
      state.cart = [
        ...state.cart.filter((product) => product?.id !== payload.id),
        state.cart.find(
          (product) =>
            product.id === payload.id && {
              ...product,
              quantity: product.quantity + 1,
            }
        ),
      ];
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = '';
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = payload;
        state.error = '';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.error = action.error.message;
      })
      .addCase(googleLogin.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = '';
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = payload;
        state.error = '';
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.error = action.error.message;
      });
  },
});

export const { logOut, setUser } = authSlice.actions;
export default authSlice.reducer;
