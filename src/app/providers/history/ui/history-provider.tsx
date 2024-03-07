import { memo, PropsWithChildren, useLayoutEffect, useState } from 'react';
import { BrowserHistory } from 'history';
import { Router } from 'react-router';

export interface HistoryProviderProps {
  history: BrowserHistory;
  basename?: string;
}

function HistoryProvider(props: PropsWithChildren<HistoryProviderProps>) {
  const { history, basename, children } = props;

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default memo(HistoryProvider);
