import { Meta, StoryObj } from '@storybook/react';
import { Text } from './text';

const meta: Meta<typeof Text> = {
  component: Text,
};
export default meta;

type Story = StoryObj<typeof Text>;

export const TextDefault: Story = {
  render: () => (
    <Text
      className="adad"
      text="asdasd"
      title="2123"
    />
  ),
};
