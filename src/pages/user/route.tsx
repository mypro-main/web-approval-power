import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';
import { LoadingScreen } from 'src/components/loading-screen';
import DashboardLayout from '../../layouts/dashboard/layout';
import { SUPER_ROLE } from '../../config-global';

const User = lazy(() => import('./user'));

export const userRoutes: RouteObject[] = [
  {
    id: 'user',
    path: 'user',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <RoleBasedGuard hasContent roles={SUPER_ROLE} isRoute>
              <Outlet />
            </RoleBasedGuard>
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [{ element: <User />, index: true }],
  },
];
