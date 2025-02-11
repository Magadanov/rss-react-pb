import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../../types/main';

interface BookState {
  selectedBooks: Book[];
}

const initialState: BookState = {
  selectedBooks: [],
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    toggleBook: (state: BookState, action: PayloadAction<{ book: Book }>) => {
      const bookInd = state.selectedBooks.findIndex(
        (book) => book.uid === action.payload.book.uid
      );
      if (bookInd === -1) {
        state.selectedBooks.push(action.payload.book);
      } else {
        state.selectedBooks.splice(bookInd, 1);
      }
    },
    unselectBooks: (state) => {
      state.selectedBooks = [];
    },
  },
});

export const bookReducers = bookSlice.reducer;

export const { toggleBook, unselectBooks } = bookSlice.actions;
