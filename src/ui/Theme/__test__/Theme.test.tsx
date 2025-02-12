import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme } from '../Theme';
import { ThemeProvider } from '../../../context/ThemeContext/ThemeContext';

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
    await user.click(themeIcon);
    expect(themeIcon).toHaveAttribute('src', 'light.svg');
  });
});
