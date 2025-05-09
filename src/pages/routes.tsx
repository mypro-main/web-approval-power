import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import MainLayout from 'src/layouts/main/layout';
import { RootBoundary } from './error';
import { approvalRoutes } from './approval/route';
import { paths } from './paths';
import View404 from './error/404';
import { authRoutes } from './auth/route';
import { territoryRoutes } from './territory/route';
import { regionRoutes } from './region/route';
import { userRoutes } from './user/route';
import { roleRoutes } from './role/route';
import { activityRoutes } from './activity/route';
import { notificationRoutes } from './notification/route';
import { positionRoutes } from './position/route';
import View403 from './error/403';
import IdamanLoginView from './auth/login/idaman';
import { IdamanLogout } from './auth/logout/idaman-logout';
import { IdamanIdle } from './auth/login/IdamanIdle';

export const router = createBrowserRouter(
  [
    {
      id: 'root',
      Component: App,
      errorElement: <RootBoundary />,
      children: [
        {
          element: (
            <MainLayout>
              <Outlet />
            </MainLayout>
          ),
          children: [
            { index: true, element: <Navigate to={paths.approval.root} /> },
            { path: '404', element: <View404 /> },
            { path: '403', element: <View403 /> },
            { path: 'signin-oidc', element: <IdamanLoginView /> },
            { path: 'signin-oidc-idle', element: <IdamanIdle /> },
            { path: 'signout-oidc', element: <IdamanLogout /> },
          ],
        },

        // Auth routes
        ...authRoutes,

        // Notification routes
        ...notificationRoutes,

        // ApprovalList routes
        ...approvalRoutes,

        // Master routes
        ...territoryRoutes,
        ...regionRoutes,

        // Authentication routes
        ...userRoutes,
        // ...roleRoutes,
        ...positionRoutes,

        // Log routes
        ...activityRoutes,

        // No match 404
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

function IdamanTest() {
  return <p>Hola</p>;
}
