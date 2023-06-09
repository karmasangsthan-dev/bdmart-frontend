import apiSlice from "../api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ data, productId }) => ({
        url: `/review/${productId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useCreateReviewMutation } = reviewApi;
