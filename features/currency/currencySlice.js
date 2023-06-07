import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  code: "USD",
  rate: 1,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setUpCurrency: (state, action) => {
      state.code = action.payload.code;
      state.rate = action.payload.rate;
    },
  },
});

export const { setUpCurrency } = currencySlice.actions;

export default currencySlice.reducer;
