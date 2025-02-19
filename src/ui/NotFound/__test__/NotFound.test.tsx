import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { NotFound } from '../NotFound';
import userEvent from '@testing-library/user-event';
import { NextRouter, useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
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

  it('should navigate to the main page when the button is clicked', async () => {
    const user = userEvent.setup();
    const pushMock = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as NextRouter);

    render(<NotFound />);

    const button = screen.getByRole('button', { name: /return main/i });
    await user.click(button);

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
