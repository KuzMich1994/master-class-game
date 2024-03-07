import { Meta, StoryObj } from '@storybook/react';
import { AppLink, AppLinkTheme } from './app-link';

const meta: Meta<typeof AppLink> = {
  component: AppLink,
};
export default meta;

type Story = StoryObj<typeof AppLink>;

export const AppLinkPrimary: Story = {
  render: () => (
    <AppLink
      className="adad"
      to=""
      theme={AppLinkTheme.PRIMARY}
    >
      adad
    </AppLink>
  ),
};
