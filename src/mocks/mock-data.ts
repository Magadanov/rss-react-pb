import { Book, BookResponse, BooksResponse, PageData } from '../types/main';

export const mockPageDate: PageData = {
  pageNumber: 2,
  pageSize: 10,
  numberOfElements: 0,
  totalElements: 0,
  totalPages: 0,
  firstPage: false,
  lastPage: false,
};

export const mockBookData: Book = {
  uid: '1',
  title: 'Book 1',
  publishedYear: 2021,
  numberOfPages: 100,
};

export const mockBookListData: BooksResponse = {
  books: [
    { uid: 'a1', title: 'Title', publishedYear: 2021, numberOfPages: 1 },
    { uid: 'a2', title: 'Title2', publishedYear: 2022, numberOfPages: 2 },
  ],
  page: mockPageDate,
};

export const mockDetailBookData: BookResponse = {
  book: {
    uid: '1',
    title: 'Book 1',
    publishedYear: 2021,
    numberOfPages: 100,
    authors: [
      {
        uid: 'p1',
        name: 'Person 1',
        placeOfBirth: '10-01-2001',
        dateOfBirth: '10-01-2001',
      },
    ],
    artists: [
      {
        uid: 'a1',
        name: 'Artist 1',
        placeOfBirth: '10-01-2001',
        dateOfBirth: '10-01-2001',
      },
    ],
    publishers: [{ uid: 'pub1', name: 'Publisher 1' }],
  },
};
