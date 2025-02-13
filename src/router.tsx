import { createBrowserRouter } from 'react-router';
import App from './App';
import DetailCard from './components/DetailCard/DetailCard';
import { NotFound } from './ui/NotFound/NotFound';

export const router = createBrowserRouter(
  [
    {
      path: '/:page?',
      element: <App />,
      errorElement: <div> Smth happened </div>,
      children: [
        {
          path: 'detail/:id',
          element: <DetailCard />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  { basename: '/rss-react-pb/hooks-and-routing' }
);
