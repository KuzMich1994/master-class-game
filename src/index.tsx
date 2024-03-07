import { createRoot } from 'react-dom/client';
import { App } from '@/app/app';
import './app/styles/index.scss';
import { StoreProvider } from '@/app/providers/store-provider';
import HistoryProvider from '@/app/providers/history/ui/history-provider';
import { browserHistory } from '@/shared/const/history/history';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Контейнер root не найден. Не удалось вмонтировать реакт приложение');
}

const root = createRoot(container);

root.render(
  <HistoryProvider history={browserHistory}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </HistoryProvider>,
);
