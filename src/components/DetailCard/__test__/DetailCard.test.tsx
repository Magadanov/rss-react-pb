import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDetailBookData } from '../../../mocks/mock-data';
import { useFetching } from '../../../hooks/useFetching';
import DetailCard from '../DetailCard';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';

vi.mock('../../../hooks/useFetching');

const MockDetailCard = () => {
  return (
    <BrowserRouter>
      <DetailCard />
    </BrowserRouter>
  );
};

describe('Detail Component', () => {
  beforeEach(() => {
    vi.mocked(useFetching).mockReturnValue({
      fetchData: vi.fn(),
      isLoading: false,
      error: '',
      data: mockDetailBookData,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render loading indicator while fetching data', () => {
    vi.mocked(useFetching).mockReturnValue({
      fetchData: vi.fn(),
      isLoading: true,
      error: '',
      data: mockDetailBookData,
    });
    const { container } = render(<MockDetailCard />);
    const loadingElement = container.querySelector('.loader');
    expect(loadingElement).toBeTruthy();
  });

  it('should return detailed card component with detailed card data', () => {
    render(<MockDetailCard />);
    const loadingElement = screen.getByText(/detail/i);
    expect(loadingElement.textContent).toEqual(
      'Detail: ' + mockDetailBookData.book.title
    );
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

    await waitFor(() => {
      expect(screen.queryByTestId('close-button')).toBeFalsy();
    });
  });
});
