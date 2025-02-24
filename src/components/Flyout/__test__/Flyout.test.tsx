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
import { convertToCSV } from '../../../utils/convertToCSV';

vi.mock('../../../utils/convertToCSV', () => ({
  convertToCSV: vi.fn(() => 'mocked_csv_data'),
}));

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

    global.URL.createObjectURL = vi.fn(() => 'mocked_url');
    global.URL.revokeObjectURL = vi.fn();
  });

  it('should generate a CSV file and trigger a download', async () => {
    const user = userEvent.setup();
    const downloadBtn = screen.getByText(/download/i);

    await user.click(downloadBtn);

    expect(convertToCSV).toHaveBeenCalledWith([mockBookData]);
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mocked_url');
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
