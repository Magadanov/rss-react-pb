import { render, screen } from '@testing-library/react';
import { mockDetailBookData } from '../../../mocks/mock-data';
import DetailCard from '../DetailCard';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import { useGetBookQuery } from '../../../store/features/book/bookApi';

vi.mock('../../../store/features/book/bookApi', () => ({
  useGetBookQuery: vi.fn(),
}));

const MockDetailCard = () => {
  return (
    <BrowserRouter>
      <DetailCard />
    </BrowserRouter>
  );
};

const defaultMockResponse = {
  data: mockDetailBookData,
  error: undefined,
  isLoading: false,
  refetch: vi.fn(),
};

describe('Detail Component', () => {
  beforeEach(() => {
    vi.mocked(useGetBookQuery).mockImplementation(() => ({
      ...defaultMockResponse,
    }));
  });

  it('should render loading indicator while fetching data', () => {
    vi.mocked(useGetBookQuery).mockImplementation(() => ({
      ...defaultMockResponse,
      isLoading: true,
    }));
    const { container } = render(<MockDetailCard />);
    const loadingElement = container.querySelector('.loader');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should return detailed card component with detailed card data', () => {
    render(<MockDetailCard />);
    const loadingElement = screen.queryByText(/detail/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('should close the component when click close button', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Routes>
          <Route path="/detail/:id" element={<DetailCard />} />
          <Route path="/1" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const closeElement = screen.getByTestId('close-button');

    await user.click(closeElement);
    expect(screen.queryByTestId('close-button')).toBeFalsy();
  });
});
