import apiSlice from '../api/apiSlice';

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ sort, filter }) => {
        const params = new URLSearchParams();
        params.append('sort', JSON.stringify(sort));
        params.append('filter', JSON.stringify(filter));
        // params.append("queries", JSON.stringify(pagination));
        const queryString = params.toString();
        return {
          url: `/products?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['Products'],
    }),
    getSectionBasedProducts: builder.query({
      query: ({ section }) => {
        return {
          url: `/products/section?section=${section}`,
          method: 'GET',
        };
      },
      providesTags: ['Products'],
    }),
    getAllProducts: builder.query({
      query: (params = {}) => {
        const { pageNumber, perPage, ...restParams } = params;
        const queryParams = new URLSearchParams(restParams);
        if (pageNumber) {
          queryParams.append('pageNumber', pageNumber);
        }
        if (perPage) {
          queryParams.append('perPage', perPage);
        }

        return {
          url: `/products/bulk?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Products'],
    }),
    getJustForYouProducts: builder.query({
      query: (params = {}) => {
        const { pageNumber, perPage, token, ...restParams } = params;


        const queryParams = new URLSearchParams(restParams);
        if (pageNumber) {
          queryParams.append('pageNumber', pageNumber);
        }
        if (perPage) {
          queryParams.append('perPage', perPage);
        }
        if (token) {
          queryParams.append('token', token);
        }

        console.log({ token });

        return {
          url: `/products/just-for-you/bulk?${queryParams.toString()}`,
          method: 'GET'
        };
      },
      providesTags: ['Products'],
    }),
    getProductDetails: builder.query({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['Product'],
    }),

    getSearchProduct: builder.query({
      query: (search) => {
        return {
          url: `/products/search?search=${search}`,
          method: 'GET',
        };
      },
      providesTags: ['Product'],
    }),

    getSubCategory: builder.query({
      query: (categoryTitle) => ({
        url: `/subcategory?categoryTitle=${categoryTitle}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),


    getSingleSubCategory: builder.query({
      query: (subCategoryId) => ({
        url: `/subCategory/${subCategoryId}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    getAllOrdersByEmail: builder.query({
      query: (email) => {
        return {
          url: `/order/order/email/${email}`,
          method: 'GET',
        };
      },
      providesTags: ['Product'],
    }),

    getCategories: builder.query({
      query: () => {
        return {
          url: `/category/category`,
          method: 'GET',
        };
      },
      providesTags: ['Categories'],
    }),

    getSuccessfulOrdersByEmail: builder.query({
      query: (email) => {
        return {
          url: `/order/success/${email}`,
          method: 'GET',
        };
      },
      providesTags: ['Product'],
    }),
    getSingleOrderById: builder.query({
      query: (id) => {
        return {
          url: `/order/order/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['Product'],
    }),
    getCartProducts: builder.mutation({
      query: (data) => ({
        url: `/cartProducts`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ["Cart"],
    }),
    getCreateOrder: builder.mutation({
      query: (data) => ({
        url: `/order/order`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ["Cart"],
    }),
    getCreateRFQ: builder.mutation({
      query: (data) => ({
        url: `/order/request-for-quote`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ["Cart"],
    }),
    getAllProductsCategory: builder.query({
      query: () => {
        return {
          url: `/category/category`,
          method: "GET",
        };
      },
      providesTags: ["Categories", "Category"],
    }),
  }),
});

export const {
  useGetAllProductsCategoryQuery,
  useGetProductsQuery,
  useGetSingleSubCategoryQuery,
  useGetAllProductsQuery,
  useGetSearchProductQuery,
  useGetSectionBasedProductsQuery,
  useGetProductDetailsQuery,
  useGetAllOrdersByEmailQuery,
  useGetSuccessfulOrdersByEmailQuery,
  useGetSingleOrderByIdQuery,
  useGetCartProductsMutation,
  useGetCreateOrderMutation,
  useGetSubCategoryQuery,
  useGetCategoriesQuery,
  useGetJustForYouProductsQuery,
  useGetCreateRFQMutation,
} = productApi;
