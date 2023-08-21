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
    signup: builder.mutation({
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

    sellerAccountVerify: builder.mutation({
      query: (data) => ({
        url: '/user/seller/verify-account',
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
    verifyOTPForSeller: builder.mutation({
      query: (data) => ({
        url: `/seller/verify-otp`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
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
  useUpdateUserPasswordMutation,
  useGetUserByTokenQuery,
  useResetPasswordEmailMutation,
  useResetPasswordMutation,
  useSendOTPMutation,
  useVerifyOTPForSellerMutation,
} = authApi;
