import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import List from '../List';
import { BrowserRouter } from 'react-router';
import { useFetching } from '../../../hooks/useFetching';
import { mockBookListData as mockData } from '../../../mocks/mock-data';

vi.mock('../../../hooks/useFetching');

const MockList = ({ searchText }: { searchText: string }) => {
  return (
    <BrowserRouter>
      <List searchText={searchText} />
    </BrowserRouter>
  );
};

describe('List Component', () => {
  it('should render correct number of cards', async () => {
    vi.mocked(useFetching).mockReturnValue({
      fetchData: vi.fn(),
      isLoading: false,
      error: '',
      data: mockData,
    });

    render(<MockList searchText="" />);
    const cardElements = await screen.findAllByTestId('card-component');
    expect(cardElements.length).toBe(mockData.books.length);
  });

  it('should render message if no cards are present', async () => {
    vi.mocked(useFetching).mockReturnValue({
      fetchData: vi.fn(),
      isLoading: false,
      error: '',
      data: undefined,
    });

    render(<MockList searchText="" />);
    const listElement = screen.getByText(/No book found/i);
    expect(listElement.textContent).toBe('No book found');
  });
});
