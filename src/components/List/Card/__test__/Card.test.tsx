import { afterEach, describe, expect, it, vi } from 'vitest';
import Card from '../Card';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { useFetching } from '../../../../hooks/useFetching';
import DetailCard from '../../../DetailCard/DetailCard';
import { mockBookData, mockDetailBookData } from '../../../../mocks/mock-data';

vi.mock('../../../../hooks/useFetching');

describe('Card Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render relevant card data', async () => {
    const mockOnCardOpen = vi.fn();
    render(<Card card={mockBookData} onClick={mockOnCardOpen} />);
    const cardElement = screen.getByTestId('card-component');
    expect(cardElement.textContent).contain(mockBookData.title);
  });

  it('should open detailed component', async () => {
    const user = userEvent.setup();
    const mockOnCardOpen = vi.fn();

    render(
      <MemoryRouter>
        <Card
          card={mockBookData}
          onClick={() => mockOnCardOpen(mockBookData.uid)}
        />
      </MemoryRouter>
    );

    const cardElement = screen.getByTestId('card-component');
    await user.click(cardElement);

    expect(mockOnCardOpen).toHaveBeenCalledWith(mockBookData.uid);
  });

  it('should triggers an additional API when click card', async () => {
    vi.mocked(useFetching).mockReturnValue({
      fetchData: vi.fn(),
      isLoading: false,
      error: '',
      data: mockDetailBookData,
    });
    const mockOnCardOpen = vi.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <Card
                card={mockBookData}
                onClick={() => mockOnCardOpen(mockBookData.uid)}
              />
            }
          />
          <Route path="/detail/:id" element={<DetailCard />} />
        </Routes>
      </MemoryRouter>
    );
    const cardElement = screen.getByTestId('card-component');
    await userEvent.click(cardElement);

    render(
      <MemoryRouter initialEntries={[`/detail/${mockBookData.uid}`]}>
        <DetailCard />
      </MemoryRouter>
    );

    expect(useFetching).toHaveBeenCalled();
  });
});
