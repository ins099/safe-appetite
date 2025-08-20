import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './baseQuery';

type QuestionParamsType = {
  limit?: number;
  searchText?: string;
  cursor?: string;
};

export const questionaireAPIS = createApi({
  reducerPath: 'questionaireAPIS',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['MyQuestions'],
  endpoints: builder => ({
    getAllergicQuestions: builder.query({
      query: (params: QuestionParamsType) => {
        return {
          url: 'category',
          method: 'GET',
          params: {...params, type: 'MY_ALLERGENS'},
        };
      },
    }),
    getIntolerantQuestions: builder.query({
      query: (params: QuestionParamsType) => ({
        url: 'category',
        method: 'GET',
        params: {...params, type: 'MY_INTOLERENCES'},
      }),
    }),
    getDietQuestions: builder.query({
      query: (params: QuestionParamsType) => ({
        url: 'category',
        method: 'GET',
        params: {...params, type: 'DIETERY_PREFERENCES'},
      }),
    }),
    getDislikesQuestions: builder.query({
      query: (params: QuestionParamsType) => ({
        url: 'category',
        method: 'GET',
        params: {...params, type: 'DISLIKES'},
      }),
    }),
    getMyAllergicQuestions: builder.query({
      query: (params: QuestionParamsType) => {
        return {
          url: 'user-category/my',
          method: 'GET',
          params: {...params, type: 'MY_ALLERGENS'},
        };
      },
      providesTags: ['MyQuestions'],
      transformResponse: response => {
        let cat = response?.data?.categories?.map(i => ({
          ...i,
          isLinked: true,
        }));
        const uniqueCat = cat.filter(
          (value, index, self) =>
            index === self.findIndex(t => t._id === value._id),
        );
        response.data.categories = uniqueCat;
        return response;
      },
    }),
    getMyIntolerantQuestions: builder.query({
      query: (params: QuestionParamsType) => ({
        url: 'user-category/my',
        method: 'GET',
        params: {...params, type: 'MY_INTOLERENCES'},
      }),
      providesTags: ['MyQuestions'],
      transformResponse: response => {
        let cat = response?.data?.categories?.map(i => ({
          ...i,
          isLinked: true,
        }));
        const uniqueCat = cat.filter(
          (value, index, self) =>
            index === self.findIndex(t => t._id === value._id),
        );
        response.data.categories = uniqueCat;
        return response;
      },
    }),
    getMyDietQuestions: builder.query({
      query: (params: QuestionParamsType) => ({
        url: 'user-category/my',
        method: 'GET',
        params: {...params, type: 'DIETERY_PREFERENCES'},
      }),
      providesTags: ['MyQuestions'],
      transformResponse: response => {
        let cat = response?.data?.categories?.map(i => ({
          ...i,
          isLinked: true,
        }));
        const uniqueCat = cat.filter(
          (value, index, self) =>
            index === self.findIndex(t => t._id === value._id),
        );
        response.data.categories = uniqueCat;
        return response;
      },
    }),
    getMyDislikesQuestions: builder.query({
      query: (params: QuestionParamsType) => ({
        url: 'user-category/my',
        method: 'GET',
        params: {...params, type: 'DISLIKES'},
      }),
      providesTags: ['MyQuestions'],
      transformResponse: response => {
        let cat = response?.data?.categories?.map(i => ({
          ...i,
          isLinked: true,
        }));
        const uniqueCat = cat.filter(
          (value, index, self) =>
            index === self.findIndex(t => t._id === value._id),
        );
        response.data.categories = uniqueCat;
        return response;
      },
    }),
    addUserQuestionaires: builder.mutation({
      query: body => ({
        url: 'user-category/link',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['MyQuestions'],
    }),
    suggestionOptions: builder.mutation({
      query: body => ({
        url: 'suggession',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllergicQuestionsQuery,
  useGetDislikesQuestionsQuery,
  useGetDietQuestionsQuery,
  useGetIntolerantQuestionsQuery,
  useAddUserQuestionairesMutation,

  useGetMyAllergicQuestionsQuery,
  useGetMyDietQuestionsQuery,
  useGetMyDislikesQuestionsQuery,
  useGetMyIntolerantQuestionsQuery,

  useSuggestionOptionsMutation,
} = questionaireAPIS;
