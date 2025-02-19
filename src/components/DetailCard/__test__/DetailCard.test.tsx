import { render, screen } from '@testing-library/react';
import { mockDetailBookData } from '../../../mocks/mock-data';
import DetailCard from '../DetailCard';
import userEvent from '@testing-library/user-event';
import { useGetBookQuery } from '../../../store/features/book/bookApi';
import { NextRouter, useRouter } from 'next/router';

vi.mock('../../../store/features/book/bookApi', () => ({
  useGetBookQuery: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

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
    const { container } = render(
      <DetailCard id={mockDetailBookData.book.uid} page="1" />
    );
    const loadingElement = container.querySelector('.loader');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should return detailed card component with detailed card data', () => {
    render(<DetailCard id={mockDetailBookData.book.uid} page="1" />);
    const loadingElement = screen.queryByText(/detail/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('should close the component when click close button', async () => {
    const user = userEvent.setup();
    const pushMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as NextRouter);

    render(<DetailCard id={mockDetailBookData.book.uid} page="1" />);

    const closeElement = screen.getByTestId('close-button');

    await user.click(closeElement);
    expect(pushMock).toHaveBeenCalledWith('/1', undefined, { shallow: true });
  });
});
