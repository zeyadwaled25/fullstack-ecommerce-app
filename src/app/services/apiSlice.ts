import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookieService from '../../services/CookieService'

export const apiSlice = createApi({
  reducerPath: 'pokemonApi',
  tagTypes: ['Products', 'Categories'],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (build) => ({
    // ---------- Products ----------
    getDashboardProducts: build.query({
      query: () => {
        return {
          url: `/api/products?fields=title,description,price,stock&populate=*&sort=createdAt:DESC`
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: {id: number | string}) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    updateDashboardProducts: build.mutation({
      query: ({documentId, body}) => ({
        url: `/api/products/${documentId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CookieService.get('jwt')}`,
        },
        body,
      }),
      async onQueryStarted({ documentId, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getDashboardProducts', documentId, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    deleteDashboardProducts: build.mutation({
      query(documentId) {
        return {
          url: `/api/products/${documentId}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${CookieService.get('jwt')}`
          }
        }
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  // ---------- Categories ----------
    getDashboardCategories: build.query({
      query: () => ({
        url: `/api/categories`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: number | string }) => ({
                type: 'Categories' as const,
                id,
              })),
              { type: 'Categories', id: 'LIST' },
            ]
          : [{ type: 'Categories', id: 'LIST' }],
    }),
    addDashboardCategory: build.mutation({
      query: (body) => ({
        url: `/api/categories`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CookieService.get('jwt')}`,
        },
        body,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    updateDashboardCategory: build.mutation({
      query: ({ documentId, body }) => ({
        url: `/api/categories/${documentId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CookieService.get('jwt')}`,
        },
        body,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    deleteDashboardCategory: build.mutation({
      query(documentId) {
        return {
          url: `/api/categories/${documentId}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${CookieService.get('jwt')}`,
          },
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
});

export const { useGetDashboardProductsQuery, useDeleteDashboardProductsMutation, useUpdateDashboardProductsMutation, useGetDashboardCategoriesQuery, useAddDashboardCategoryMutation, useUpdateDashboardCategoryMutation, useDeleteDashboardCategoryMutation } = apiSlice