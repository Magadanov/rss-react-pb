import { BookResponse, BooksResponse } from '../types/main';

export const apiService = {
  API_URL: 'https://stapi.co/api/v2/rest/book',
  PAGE_SIZE: 10,
  getBooks: async function ({
    pageNumber,
    searchValue,
  }: {
    pageNumber: number;
    searchValue: string;
  }): Promise<BooksResponse> {
    let query = `pageNumber=${pageNumber - 1}&pageSize=${this.PAGE_SIZE}`;
    if (searchValue) {
      query += `&title=${searchValue}&name=${searchValue}`;
    }
    const res = await fetch(`${this.API_URL}/search?${query}`, {
      method: 'POST',
    });

    return res.json();
  },
  getBook: async function (id: string): Promise<BookResponse> {
    const res = await fetch(`${this.API_URL}?uid=${id}`);

    return res.json();
  },
};
