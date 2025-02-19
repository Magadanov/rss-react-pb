import Card from '../Card';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import DetailCard from '../../../DetailCard/DetailCard';
import { mockBookData, mockDetailBookData } from '../../../../mocks/mock-data';
import { useGetBookQuery } from '../../../../store/features/book/bookApi';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  bookReducers,
  BookState,
} from '../../../../store/features/book/bookSlice';

vi.mock('../../../../store/features/book/bookApi', () => ({
  useGetBookQuery: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { page: '1' },
  }),
}));

const renderWithStore = (
  children: React.ReactNode,
  initialState: BookState = { selectedBooks: [] }
) => {
  const store = configureStore({
    reducer: {
      books: bookReducers,
    },
    preloadedState: {
      books: initialState,
    },
  });
  return { ...render(<Provider store={store}>{children}</Provider>), store };
};

describe('Card Component', () => {
  it('should render relevant card data', async () => {
    renderWithStore(<Card card={mockBookData} />);
    const cardElement = screen.getByTestId('card-component');
    expect(cardElement.textContent).contain(mockBookData.title);
  });

  it('should open detailed component', async () => {
    renderWithStore(
      <MemoryRouter>
        <Card card={mockBookData} />
      </MemoryRouter>
    );

    const cardElement = screen.getByTestId('card-component');
    expect(cardElement).toHaveAttribute(
      'href',
      `1/?bookId=${mockBookData.uid}`
    );
  });

  it('should triggers an additional API when click card', async () => {
    vi.mocked(useGetBookQuery).mockReturnValue({
      refetch: vi.fn(),
      isLoading: false,
      error: false,
      data: mockDetailBookData,
    });

    renderWithStore(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Card card={mockBookData} />} />
          <Route
            path="/detail/:id"
            element={<DetailCard page="1" id={mockBookData.uid} />}
          />
        </Routes>
      </MemoryRouter>
    );
    const cardElement = screen.getByTestId('card-component');
    await userEvent.click(cardElement);

    render(
      <MemoryRouter initialEntries={[`/detail/${mockBookData.uid}`]}>
        <DetailCard page="1" id={mockBookData.uid} />
      </MemoryRouter>
    );

    expect(useGetBookQuery).toHaveBeenCalled();
  });

  it('should add selected book to store when click checkbox', async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<Card card={mockBookData} />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(store.getState().books.selectedBooks.length).toBe(1);
  });

  it('should checked when book is selected', async () => {
    renderWithStore(<Card card={mockBookData} />, {
      selectedBooks: [mockBookData],
    });
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });
});
