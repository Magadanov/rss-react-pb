'use client';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext/ThemeContext';
import ErrorBoundary from '@/Error';
import { appStore } from '@/store/store';
import { Provider } from 'react-redux';

export default function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <ErrorBoundary>
      <Provider store={appStore}>
        <ThemeProvider>
          {children}
          {modal}
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
