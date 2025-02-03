export interface Book {
  uid: string;
  title: string;
  publishedYear: number;
  numberOfPages: number;
}

export interface PageData {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface BooksResponse {
  page: PageData;
  books: Book[];
}

interface Person {
  uid: string;
  name: string;
  placeOfBirth: string;
  dateOfBirth: string;
}

export interface BookResponse {
  book: {
    uid: string;
    title: string;
    publishedYear: number;
    numberOfPages: number;
    authors: Person[];
    artists: Person[];
    publishers: { uid: string; name: string }[];
  };
}
