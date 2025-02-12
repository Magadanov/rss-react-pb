import { fireEvent, render, screen } from '@testing-library/react';
import ErrorButton from '../ErrorButton';

describe('ErrorButton Component', () => {
  beforeEach(() => {
    render(<ErrorButton />);
  });

  it('should render the button correctly', () => {
    const button = screen.getByText(/error/i);
    expect(button).toBeInTheDocument();
  });

  it('should throw an error when the button is clicked', async () => {
    const button = screen.getByRole('button');
    expect(() => fireEvent.click(button)).toThrowError('smth error');
  });
});
