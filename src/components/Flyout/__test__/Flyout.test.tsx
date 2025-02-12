import { render, screen, waitFor } from '@testing-library/react';
import { mockBookData } from '../../../mocks/mock-data';
import {
  bookReducers,
  toggleBook,
  unselectBooks,
} from '../../../store/features/book/bookSlice';
import Flyout from '../Flyout';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const initialState = {
  selectedBooks: [mockBookData],
};

describe('Flyout component', () => {
  const store = configureStore({
    reducer: {
      books: bookReducers,
    },
    preloadedState: {
      books: initialState,
    },
  });
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
  });
  it('should unselect all selected books when click unselect all button', () => {
    const user = userEvent.setup();
    const unselectBooksState = bookReducers(initialState, unselectBooks());
    const unselectBtn = screen.getByText(/unselect/i);
    user.click(unselectBtn);
    expect(unselectBooksState.selectedBooks.length).toBe(0);
  });

  it('should return singular item text when selected books are equal to 1', () => {
    expect(screen.getByTestId('selected-item')).toHaveTextContent(/1 item/i);
  });

  it('should return singular item text when selected books are more than 1', () => {
    store.dispatch(toggleBook({ book: { ...mockBookData, uid: '2' } }));

    waitFor(() => {
      expect(screen.getByTestId('selected-item')).toHaveTextContent(/items/i);
    });
  });
});
