import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './baseQuery';

export const authApis = createApi({
  reducerPath: 'authApis',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: builder => ({
    getUser: builder.query({
      query: params => ({
        url: 'user/me',
        method: 'GET',
        params,
      }),
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: bocy => ({
        url: 'user/me',
        method: 'DELETE',
        bocy,
      }),
      invalidatesTags: ['User'],
    }),
    logoutUser: builder.mutation({
      query: bocy => ({
        url: 'user/token',
        method: 'PATCH',
        bocy,
      }),
      invalidatesTags: ['User'],
    }),
    userUpdatePasswrod: builder.mutation({
      query: body => ({
        url: 'user/password',
        method: 'PATCH',
        body,
      }),
    }),
    userRegister: builder.mutation({
      query: body => ({
        url: 'user/signup',
        method: 'POST',
        body,
      }),
    }),
    verifyOTP: builder.mutation({
      query: body => ({
        url: 'user/verify-otp',
        method: 'POST',
        body,
      }),
    }),
    userLogin: builder.mutation({
      query: body => ({
        url: 'user/login',
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: body => ({
        url: 'user/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: body => ({
        url: 'user/reset-password',
        method: 'PATCH',
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: body => ({
        url: 'user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useUserRegisterMutation,
  useUserLoginMutation,
  useUpdateUserMutation,
  useUserUpdatePasswrodMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
} = authApis;
