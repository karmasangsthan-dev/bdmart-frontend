import apiSlice from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ sort, filter, pagination }) => {
        console.log(pagination);
        const params = new URLSearchParams();
        params.append("sort", JSON.stringify(sort));
        params.append("filter", JSON.stringify(filter));
        // params.append("queries", JSON.stringify(pagination));
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
    getProductDetails: builder.query({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
} = productApi;
