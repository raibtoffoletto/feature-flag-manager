import Layout from '@components/common/Layout';
import { AppRoutes } from '@constants';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

const Routes: RouteObject[] = [
  {
    path: AppRoutes.root,
    element: <Layout />,
    children: [
      {
        path: AppRoutes.settings,
        element: <div>sett</div>,
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
