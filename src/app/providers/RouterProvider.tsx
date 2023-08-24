import { lazy } from 'react';
import { MainLayout } from '~pages/layouts';
import { Navigate, useRoutes } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Loadable } from '~shared/ui/loadable';
import Page404 from '~pages/page-404';

const HomePage = Loadable(lazy(() => import('~pages/home')));
const JobPage = Loadable(lazy(() => import('~pages/job')));

export function Router() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: PATH_PAGE.root,
          element: <HomePage />,
        },
      ],
    },
    {
      path: 'job',
      children: [
        {
          element: <Navigate to={PATH_PAGE.page404} replace />,
          index: true,
        },
        { path: ':slug', element: <JobPage /> },
      ],
    },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> },
  ]);
}
