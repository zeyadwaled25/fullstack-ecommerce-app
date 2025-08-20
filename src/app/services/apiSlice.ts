import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookieService from '../../services/CookieService'

interface IUpdateProducts {
  title: string,
  description: string,
  price: number,
  stock: number,
  category: {
    title: string
  },
  'files.thumbnail': File
}

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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: {id: number | string}) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    updateDashboardProducts: build.mutation({
      query: ({documentId, body}: {documentId: string, body: IUpdateProducts}) => ({
        url: `/api/products/${documentId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CookieService.get('jwt')}`
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
    })
  }),
})

export const { useGetDashboardProductsQuery, useDeleteDashboardProductsMutation } = apiSlice