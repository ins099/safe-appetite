import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './baseQuery';

type ProductParamType = {
  limit?: number;
  searchText?: string;
  cursor?: string;
  qrCode?: string;
  _id?: string;
};

export const productAPIS = createApi({
  reducerPath: 'productAPIS',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products', 'FavProducts', 'Product'],
  endpoints: builder => ({
    getMyProducts: builder.query({
      query: (params: ProductParamType) => {
        return {
          url: 'product',
          method: 'GET',
          params: {...params, type: 'MY_ALLERGENS'},
        };
      },
      providesTags: ['Products'],
    }),
    getMyFavouriteProducts: builder.query({
      query: (params: ProductParamType) => {
        return {
          url: 'favourite',
          method: 'GET',
          params: {...params, type: 'MY_ALLERGENS'},
        };
      },
      providesTags: ['FavProducts'],
      transformResponse: res => {
        const response = res;
        response.data.favourites = res.data.favourites.map(item => ({
          ...item.product,
          fav: true,
        }));

        return response;
      },
    }),
    scanProduct: builder.query({
      query: params => {
        return ({
        url: 'product/scan',
        method: 'GET',
        params,
      })},
      providesTags: ['Products', 'Product'],
    }),
    markAsFavourite: builder.mutation({
      query: body => ({
        url: 'favourite',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products', 'FavProducts', 'Product'],
    }),
    removeAsFavourite: builder.mutation({
      query: body => ({
        url: `favourite/${body?.productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'FavProducts', 'Product'],
    }),
    getProductById: builder.query({
      query: (params: ProductParamType) => {
        return {
          url: `product/${params?._id}`,
          method: 'GET',
        };
      },
      serializeQueryArgs: ({queryArgs}) => {
        return `getProductById`;
      },
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetMyProductsQuery,
  useGetProductByIdQuery,
  useScanProductQuery,
  useLazyScanProductQuery,
  useGetMyFavouriteProductsQuery,
  useMarkAsFavouriteMutation,
  useRemoveAsFavouriteMutation,
  useLazyGetProductByIdQuery,
} = productAPIS;
