import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'pokemonApi',
  tagTypes: ['Products'],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (build) => ({
    getDashboardProducts: build.query({
      query: () => {
        return {
          url: `/api/products?fields=title,description,price,stock&populate=*&sort=createdAt:DESC`
        }
      },
    }),
    deleteDashboardProducts: build.mutation({
      query(documentId) {
        return {
          url: `/api/products/${documentId}`,
          method: 'DELETE'
        }
      }
    })
  }),
})

export const { useGetDashboardProductsQuery, useDeleteDashboardProductsMutation } = apiSlice