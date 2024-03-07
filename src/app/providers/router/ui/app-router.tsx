import { memo, Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router';
import { routerConfig } from '../config/router-config';
import { Layout } from '@/widgets/layout';

function AppRouter() {
  const renderWithContainer = useCallback((route: RouteProps) => {
    const element = (
      <Suspense fallback="">
        <Layout>{route.element}</Layout>
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={element}
      />
    );
  }, []);

  return <Routes>{Object.values(routerConfig).map(renderWithContainer)}</Routes>;
}

export default memo(AppRouter);
