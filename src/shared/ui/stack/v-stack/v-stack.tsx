import { memo, PropsWithChildren } from 'react';
import { Flex, FlexProps } from '../flex/flex';

type HStackProps = Omit<PropsWithChildren<FlexProps>, 'direction'>;

export const VStack = memo((props: HStackProps) => (
  // @ts-ignore
  <Flex
    direction="column"
    {...props}
  />
));
