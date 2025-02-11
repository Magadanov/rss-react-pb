import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../Error';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  it('should render children correctly if no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );

    const childElement = screen.getByText('Child content');

    expect(childElement).toBeInTheDocument();
  });

  it('should display the fallback UI when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const errorElement = screen.getByText('Something went wrong.');
    expect(errorElement).toBeInTheDocument();
  });
});
