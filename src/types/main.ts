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
