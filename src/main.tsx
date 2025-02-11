import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { Provider } from 'react-redux';
import { appStore } from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
