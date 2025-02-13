import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { NotFound } from '../NotFound';
import { useNavigate } from 'react-router';
import userEvent from '@testing-library/user-event';

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

describe('NotFound Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render 404 and Not Found text', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeTruthy();
  });

  it('should navigate to the main page when the button is clicked', () => {
    const user = userEvent.setup();

    render(<NotFound />);

    const button = screen.getByText(/return main/i);

    user.click(button);
    expect(useNavigate).toHaveBeenCalled();
  });
});
