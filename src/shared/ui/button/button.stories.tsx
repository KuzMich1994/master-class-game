import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonTheme } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonPrimary: Story = {
  render: () => <Button className="adad">click me</Button>,
};

export const ButtonSecondary: Story = {
  render: () => (
    <Button
      theme={ButtonTheme.SECONDARY}
      className="adad"
    >
      click me
    </Button>
  ),
};

export const ClickAction: Story = {
  render: () => (
    <Button
      theme={ButtonTheme.SECONDARY}
      className="adad"
      onClick={() => {
        alert('Это был клик по кнопке!');
      }}
    >
      click me
    </Button>
  ),
};
