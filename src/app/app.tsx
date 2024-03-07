import { Suspense } from 'react';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppRouter } from './providers/router';

export function App() {
  return (
    <div
      id="app"
      className={classNames('app', {}, ['app-light-theme'])}
    >
      <Suspense fallback="">
        <AppRouter />
      </Suspense>
    </div>
  );
}
