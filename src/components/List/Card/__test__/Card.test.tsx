import { afterEach, describe, expect, it, vi } from 'vitest';
import Card from '../Card';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router';
import { useFetching } from '../../../../hooks/useFetching';
import DetailCard from '../../../DetailCard/DetailCard';
import { mockBookData, mockDetailBookData } from '../../../../mocks/mock-data';

vi.mock('../../../../hooks/useFetching');

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Card Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render relevant card data', async () => {
    render(<Card card={mockBookData} />);
    const cardElement = screen.getByTestId('card-component');
    expect(cardElement.textContent).contain(mockBookData.title);
  });

  it('should open detailed component', async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <Card card={mockBookData} />
      </MemoryRouter>
    );

    const cardElement = screen.getByTestId('card-component');
    await user.click(cardElement);

    expect(navigate).toHaveBeenCalledWith(mockBookData.uid);
  });

  it('should triggers an additional API when click card', async () => {
    vi.mocked(useFetching).mockReturnValue({
      fetchData: vi.fn(),
      isLoading: false,
      error: '',
      data: mockDetailBookData,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Card card={mockBookData} />} />
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
