import { BrowserRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '../Pagination';
import { mockPageDate } from '../../../mocks/mock-data';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Pagination Component', () => {
  it('should update the URL when button is clicked', async () => {
    const user = userEvent.setup();
    const mockSetPage = vi.fn();

    const initialPage = 2;

    render(
      <BrowserRouter>
        <Pagination
          pageData={{ ...mockPageDate, pageNumber: initialPage }}
          setPage={mockSetPage}
        />
      </BrowserRouter>
    );

    const nextButton = screen.getByText('Next');
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockSetPage).toHaveBeenCalledWith(3);
    });
  });
});
