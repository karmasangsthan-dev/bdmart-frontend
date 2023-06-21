import apiSlice from "../api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ data, productId }) => ({
        url: `/review/${productId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    makeReply: builder.mutation({
      query: ({ reviewId, ...data }) => ({
        url: `/review/reply/${reviewId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    likeOnReview: builder.mutation({
      query: ({ reviewId, ...email }) => ({
        url: `/review/like/${reviewId}`,
        method: "PATCH",
        body: email,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    unLikeReview: builder.mutation({
      query: ({ reviewId, ...email }) => ({
        url: `/review/unlike/${reviewId}`,
        method: "PATCH",
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
