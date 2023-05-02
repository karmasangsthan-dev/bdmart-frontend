import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: (token) => ({
        url: "/user/me",
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    socialLogin: builder.mutation({
      query: (data) => ({
        url: "/user/socialLogin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfileImage: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `/user/profile/image/${id}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: ({ token, data, id }) => ({
        url: `/user/profile/${id}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addToCart: builder.mutation({
      query: ({ token, ...data }) => ({
        url: "/user/addToCart",
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    handleCartQuantity: builder.mutation({
      query: ({ token, ...data }) => ({
        url: "/user/cartQuantity",
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useSocialLoginMutation,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
  useGetMeQuery,
  useAddToCartMutation,
  useHandleCartQuantityMutation,
} = authApi;
