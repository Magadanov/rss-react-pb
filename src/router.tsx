import { createBrowserRouter } from 'react-router';
import App from './App';
import Main from './pages/main/Main';
import Uncontrolled from './pages/uncontrolled/Uncontrolled';
import HookForm from './pages/hook-form/HookForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Main /> },
      { path: 'uf', element: <Uncontrolled /> },
      { path: 'rhf', element: <HookForm /> },
    ],
  },
]);
