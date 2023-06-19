import apiSlice from "../api/apiSlice";

const questionAndAnswerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: ({ productId, ...data }) => {
        console.log({productId})
        return {
          url: `/question/${productId}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["QuestionAndAnswer", "Product"],
    }),
    makeAnswer: builder.mutation({
      query: ({ questionId, ...data }) => ({
        url: `/question/ans/${questionId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["QuestionAndAnswer", "Product"],
    }),
  }),
});

export const { useCreateQuestionMutation, useMakeAnswerMutation } =
  questionAndAnswerApi;
