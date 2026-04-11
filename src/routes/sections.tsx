import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ShaderBasicPage = lazy(() => import('src/pages/shader-basic'));
export const RobotPage = lazy(() => import('src/pages/robot'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LaboratoryPage = lazy(() => import('src/pages/laboratory'))
export const GraphicPage = lazy(()=>import('src/pages/graphic'))
export const ThreeJsPage = lazy(()=>import('src/pages/threejs'))
export const GeometryPage = lazy(()=>import('src/pages/geometry'))
export const TexturePage = lazy(()=>import('src/pages/texture'))

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'laboratory', element: <LaboratoryPage /> },
        { path: 'graphic', element: <GraphicPage />},
        { path: 'threeJS', element: <ThreeJsPage />},
        { path: 'geometry', element: <GeometryPage />},
        { path: 'texture', element: <TexturePage />},
        { path: 'shader-basic', element: <ShaderBasicPage /> },
      
        { path: 'robot', element: <RobotPage /> },],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
