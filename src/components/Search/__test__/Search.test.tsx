import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Search from '../Search';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useSearchQuery } from '../../../hooks/useSearchQuery';

vi.mock('../../../hooks/useSearchQuery');

describe('Search Component', () => {
  const mockSetSearchText = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should entered value to the local storage', async () => {
    render(<Search searchText={''} setSearchText={mockSetSearchText} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(inputElement, { target: { value: 'test search' } });
    fireEvent.click(searchButton);

    expect(mockSetSearchText).toHaveBeenCalledWith('test search');
  });

  it('should get value from the local storage upon mounting', async () => {
    const mockedData = { query: 'stored value', setQuery: vi.fn() };
    vi.mocked(useSearchQuery).mockReturnValue(mockedData);

    render(
      <Search searchText={mockedData.query} setSearchText={mockSetSearchText} />
    );

    const inputElement = screen.getByPlaceholderText(
      'Search...'
    ) as HTMLInputElement;

    expect(inputElement.value).toBe('stored value');
  });
});
