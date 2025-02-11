import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BookResponse, BooksResponse } from '../../../types/main';

const API_URL = 'https://stapi.co/api/v2/rest/book';
const PAGE_SIZE = 10;

export const apiBook = createApi({
  reducerPath: 'BookApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getBooks: build.mutation<
      BooksResponse,
      { pageNumber: number; searchValue: string }
    >({
      query: ({ pageNumber, searchValue }) => ({
        url: '/search',
        method: 'POST',
        params: {
          pageNumber: pageNumber - 1,
          pageSize: PAGE_SIZE,
          title: searchValue,
          name: searchValue,
        },
      }),
    }),
    getBook: build.query<BookResponse, string>({
      query: (id) => ({
        url: '/',
        params: {
          uid: id,
        },
      }),
    }),
  }),
});

export const { useGetBooksMutation, useGetBookQuery } = apiBook;
