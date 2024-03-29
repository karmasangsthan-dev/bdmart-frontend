import apiSlice from "../api/apiSlice";

const questionAndAnswerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: ({ token, productId, ...data }) => {
        return {
          url: `/question/${productId}`,
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["QuestionAndAnswer", "Product"],
    }),
    makeAnswer: builder.mutation({
      query: ({ token, questionId, ...data }) => ({
        url: `/question/ans/${questionId}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["QuestionAndAnswer", "Product"],
    }),
  }),
});

export const { useCreateQuestionMutation, useMakeAnswerMutation } =
  questionAndAnswerApi;
