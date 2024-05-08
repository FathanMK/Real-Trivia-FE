import type { LoginRequest, RegisterRequest } from './interfaces/Request';
import { GetUserByIdResponse, type LoginResponse, type RegisterResponse } from './interfaces/Response';

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
  tagTypes: ['User'],
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
    }),
    getUserById: builder.query<GetUserByIdResponse, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      })
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserByIdQuery } = userApi;
