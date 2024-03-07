import { Meta, StoryObj } from '@storybook/react';
import Popup from './popup';

const meta: Meta = {
  component: Popup,
};

export default meta;

type Story = StoryObj<typeof Popup>;

export const PopupStory: Story = {
  render: () => (
    <Popup
      isOpen
      onClose={() => {}}
    >
      <div />
    </Popup>
  ),
};
