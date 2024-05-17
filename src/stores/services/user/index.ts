import type { LoginRequest, RegisterRequest } from './interfaces/Request';
import type { CheckTokenResponse, GetUserByIdResponse, LoginResponse, RegisterResponse } from './interfaces/Response';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.2.2:3003/api/v1', prepareHeaders: (headers, api) => {
      const { user: { token } } = api.getState() as any
      headers.set("Authorization", `Bearer ${token}`)

      return headers
    }
  }),
  reducerPath: 'userApi',
  tagTypes: ["User"],
  endpoints: builder => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: body => ({
        url: '/user/register',
        method: 'POST',
        body,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: '/user/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["User"]
    }),
    getUserById: builder.query<GetUserByIdResponse, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"]
    }),
    checkToken: builder.query<CheckTokenResponse, void>({
      query: () => ({
        url: "/user/checkToken",
        method: "GET"
      })
    }),
    updateUser: builder.mutation<any, any>({
      query: body => ({
        url: '/user/update',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["User"]
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserByIdQuery, useCheckTokenQuery, useUpdateUserMutation } = userApi;
