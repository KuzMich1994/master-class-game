import { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';
import LogoIcon from '../../assets/icons/logo.svg';

const meta: Meta<typeof Icon> = {
  component: Icon,
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const IconStory: Story = {
  render: () => (
    <Icon
      style={{ color: '#E21A1A' }}
      Svg={LogoIcon}
      className="adad"
    >
      adad
    </Icon>
  ),
};
