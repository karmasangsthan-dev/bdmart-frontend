import apiSlice from "../api/apiSlice";

const currencyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrency: builder.query({
      query: () => {
        return {
          url: `/currency`,
          method: "GET",
        };
      },
      providesTags: ["Currency"],
    }),
    updateCurrency: builder.mutation({
      query: (data) => ({
        url: "/currency",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Currency"],
    }),
  }),
});

export const { useGetCurrencyQuery, useUpdateCurrencyMutation } = currencyApi;
