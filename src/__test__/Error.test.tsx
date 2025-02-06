import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ErrorBoundary from '../Error';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render children correctly if no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );

    const childElement = screen.getByText('Child content');

    expect(childElement.textContent).toEqual('Child content');
  });

  it('should display the fallback UI when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const errorElement = screen.getByText('Something went wrong.');
    expect(errorElement).toBeTruthy();
  });
});
