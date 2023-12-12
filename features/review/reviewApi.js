import apiSlice from "../api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ data, productId, token }) => ({
        url: `/review/${productId}`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    makeReply: builder.mutation({
      query: ({ token, reviewId, ...data }) => ({
        url: `/review/reply/${reviewId}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    likeOnReview: builder.mutation({
      query: ({ token, reviewId, ...email }) => ({
        url: `/review/like/${reviewId}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: email,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    unLikeReview: builder.mutation({
      query: ({ token, reviewId, ...email }) => ({
        url: `/review/unlike/${reviewId}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: email,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useMakeReplyMutation,
  useLikeOnReviewMutation,
  useUnLikeReviewMutation,
} = reviewApi;
