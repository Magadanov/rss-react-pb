import { render, screen } from '@testing-library/react';
import List from '../List';
import { BrowserRouter } from 'react-router';
import { mockBookListData as mockData } from '../../../mocks/mock-data';
import { useGetBooksMutation } from '../../../store/features/book/bookApi';
import { configureStore } from '@reduxjs/toolkit';
import { bookReducers } from '../../../store/features/book/bookSlice';
import { Provider } from 'react-redux';

vi.mock('../../../store/features/book/bookApi', () => ({
  useGetBooksMutation: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useParams: () => ({ page: '1' }),
}));

const defaultMockResponse = {
  refetch: vi.fn(),
  reset: vi.fn(),
  isLoading: false,
  error: '',
  data: mockData,
};

const MockList = ({ searchText }: { searchText: string }) => {
  const store = configureStore({
    reducer: {
      books: bookReducers,
    },
    preloadedState: {
      books: { selectedBooks: [] },
    },
  });
  return (
    <Provider store={store}>
      <BrowserRouter>
        <List searchText={searchText} />
      </BrowserRouter>
    </Provider>
  );
};

describe('List Component', () => {
  beforeEach(() => {
    vi.mocked(useGetBooksMutation).mockImplementation(() => [
      vi.fn(),
      defaultMockResponse,
    ]);
  });

  it('should render loading indicator while fetching data', () => {
    vi.mocked(useGetBooksMutation).mockImplementation(() => [
      vi.fn(),
      { ...defaultMockResponse, isLoading: true },
    ]);
    const { container } = render(<MockList searchText="" />);
    const loadingElement = container.querySelector('.loader');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render correct number of cards', async () => {
    render(<MockList searchText="" />);
    const cardElements = await screen.findAllByTestId('card-component');
    expect(cardElements.length).toBe(mockData.books.length);
  });

  it('should render message if no cards are present', async () => {
    vi.mocked(useGetBooksMutation).mockImplementation(() => [
      vi.fn(),
      { ...defaultMockResponse, error: true, data: undefined },
    ]);

    render(<MockList searchText="" />);
    const listElement = screen.getByText(/No book found/i);
    expect(listElement.textContent).toBe('No book found');
  });
});
