import apiSlice from '../api/apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: (token) => ({
        url: '/user/me',
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getMeSeller: builder.query({
      query: (token) => ({
        url: '/seller/me',
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }),
      providesTags: ['Seller'],
    }),
    getUserByToken: builder.query({
      query: (token) => ({
        url: `/user/token/${token}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUserByToken: builder.query({
      query: (token) => ({
        url: `/user/token/${token}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    customerSignup: builder.mutation({
      query: (data) => ({
        url: '/user/signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    socialLogin: builder.mutation({
      query: (data) => ({
        url: '/user/socialLogin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateProfileImage: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `/user/profile/image/${id}`,
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: ({ token, data, id }) => ({
        url: `/user/profile/${id}`,
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateUserPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/user/change-password`,
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/user/change-password`,
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    resetPasswordEmail: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/user/reset-password-email`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['User'],
    }),
    resetPassword: builder.mutation({
      query: ({ resetToken, ...data }) => ({
        url: `/user/forgotten-password`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${resetToken}`,
        },
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    sellerSignup: builder.mutation({
      query: (data) => ({
        url: '/seller/signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    sellerSignin: builder.mutation({
      query: (data) => ({
        url: '/seller/signin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),


    sendOTP: builder.mutation({
      query: (email) => ({
        url: `/seller/send-email`,
        method: 'POST',
        body: email,
      }),
      invalidatesTags: ['User'],
    }),
    sendCustomerOTP: builder.mutation({
      query: (email) => ({
        url: `/user/send-email`,
        method: 'POST',
        body: email,
      }),
      invalidatesTags: ['User'],
    }),
    verifyOTPForSeller: builder.mutation({
      query: (data) => ({
        url: `/seller/verify-otp`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    verifyOTPForCustomer: builder.mutation({
      query: (data) => ({
        url: `/user/verify-otp`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    inactiveSellerDetailsSubmit: builder.mutation({
      query: (email) => ({
        url: `/seller/submit-seller-details/${email}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),




  }),
});

export const {
  useLoginMutation,
  useCustomerSignupMutation,
  useSocialLoginMutation,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
  useGetMeQuery,
  useUpdateUserPasswordMutation,
  useGetUserByTokenQuery,
  useResetPasswordEmailMutation,
  useResetPasswordMutation,
  useSendOTPMutation,
  useVerifyOTPForSellerMutation,
  useSellerSignupMutation,
  useSellerSigninMutation,
  useSendCustomerOTPMutation,
  useVerifyOTPForCustomerMutation,
  useInactiveSellerDetailsSubmitMutation,
} = authApi;
