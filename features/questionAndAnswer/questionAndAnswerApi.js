import apiSlice from "../api/apiSlice";

const questionAndAnswerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: ({token, productId, ...data }) => {
        console.log({token,productId});
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
