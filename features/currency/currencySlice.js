import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  currency: "USD",
  currencyRate: 1,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setUpCurrency: (state, action) => {
      state.currency = action.payload.currency;
      state.currencyRate = action.payload.currencyRate;
    },
  },
});

export const { setUpCurrency } = currencySlice.actions;

export default currencySlice.reducer;
