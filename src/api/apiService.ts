import { BooksResponse } from '../types/main';

export const apiService = {
  API_URL: 'https://stapi.co/api/v2/rest/book/search',
  PAGE_SIZE: 10,
  getBooks: async function ({
    pageNumber,
    searchValue,
  }: {
    pageNumber: number;
    searchValue: string;
  }): Promise<BooksResponse> {
    let query = `pageNumber=${pageNumber}&pageSize=${this.PAGE_SIZE}`;
    if (searchValue) {
      query += `&title=${searchValue}&name=${searchValue}`;
    }
    const res = await fetch(`${this.API_URL}?${query}`, {
      method: 'POST',
    });

    return res.json();
  },
};
