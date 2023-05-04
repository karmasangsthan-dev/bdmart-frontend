import apiSlice from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ sort, filter }) => {
        console.log({ sort, filter });
        const params = new URLSearchParams();
        params.append("sort", JSON.stringify(sort));
        params.append("filter", JSON.stringify(filter));
        const queryString = params.toString();
        return {
          url: `/products?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    getAllProducts: builder.query({
      query: () => {
        return {
          url: `/products/bulk`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useGetAllProductsQuery } = productApi;
