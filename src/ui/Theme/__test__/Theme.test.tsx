import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme } from '../Theme';
import { ThemeProvider } from '@/context/ThemeContext/ThemeContext';
import { Attributes } from 'react';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Attributes) => <img {...props} />,
}));

describe('Theme Component', () => {
  it('should render the theme icon correctly', () => {
    render(
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
    );

    const themeIcon = screen.getByRole('img');
    expect(themeIcon).toBeInTheDocument();
  });

  it('should toggle theme on click', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
    );

    const themeIcon = screen.getByRole('img');
    const initialSrc = themeIcon.getAttribute('src');

    await user.click(themeIcon);

    const updatedSrc = themeIcon.getAttribute('src');
    expect(updatedSrc).not.toBe(initialSrc);
  });
});
