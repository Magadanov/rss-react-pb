import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ErrorButton from '../ErrorButton';

describe('ErrorButton Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render the button correctly', () => {
    render(<ErrorButton />);

    const button = screen.getByText(/error/i);
    expect(button).toBeTruthy();
  });

  it('should throw an error when the button is clicked', async () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button');
    expect(() => fireEvent.click(button)).toThrowError('smth error');
  });
});
