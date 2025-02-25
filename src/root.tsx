import { Provider } from 'react-redux';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { appStore } from './store/store';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import './index.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Router SRR</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <Provider store={appStore}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
}
