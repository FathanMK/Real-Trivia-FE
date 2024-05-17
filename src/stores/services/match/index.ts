import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const matchApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.2.2:3003/api/v1', prepareHeaders: (headers, api) => {
      const { user: { token } } = api.getState() as any
      headers.set("Authorization", `Bearer ${token}`)

      return headers
    }
  }),
  reducerPath: 'matchApi',
  tagTypes: ['Match'],
  endpoints: builder => ({
    createMatch: builder.mutation<any, any>({
      query: body => ({
        url: '/match',
        method: 'POST',
        body,
      }),
    }),
  })
})

export const { useCreateMatchMutation } = matchApi