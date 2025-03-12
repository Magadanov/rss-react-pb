import { ThemeProvider } from '@/context/ThemeContext/ThemeContext';
import ErrorBoundary from '@/Error';
import { appStore } from '@/store/store';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <Provider store={appStore}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
