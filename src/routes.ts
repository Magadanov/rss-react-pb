import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/:page?', './App.tsx', [
    route('detail/:id', './components/DetailCard/DetailCard.tsx'),
  ]),
  route('*', './ui/NotFound/NotFound.tsx'),
] satisfies RouteConfig;
