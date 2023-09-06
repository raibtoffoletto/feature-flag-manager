import Layout from '@components/layout/Layout';
import { AppRoutes } from '@constants';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Settings from './Settings';

const Routes: RouteObject[] = [
  {
    path: AppRoutes.root,
    element: <Layout />,
    children: [
      {
        path: AppRoutes.settings,
        element: <Settings />,
      },
      {
        index: true,
        element: <div>home</div>,
      },
    ],
  },
];

export default function Router() {
  const router = createBrowserRouter(Routes);

  return <RouterProvider router={router} />;
}
