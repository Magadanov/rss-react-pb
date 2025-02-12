import { configureStore } from '@reduxjs/toolkit';
import { bookReducers } from './features/book/bookSlice';
import { apiBook } from './features/book/bookApi';

export const appStore = configureStore({
  reducer: {
    books: bookReducers,
    [apiBook.reducerPath]: apiBook.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiBook.middleware),
});

export type RootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;
