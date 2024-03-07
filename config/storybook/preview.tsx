import type { Preview } from '@storybook/react';
import '@/app/styles/index.scss';
import HistoryProvider from '@/app/providers/history/ui/history-provider';
import { browserHistory } from '@/shared/const/history/history';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        style={{ padding: '24px' }}
        className="app app-light-theme"
      >
        <Story />
      </div>
    ),
    (Story) => (
      <HistoryProvider history={browserHistory}>
        <Story />
      </HistoryProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
