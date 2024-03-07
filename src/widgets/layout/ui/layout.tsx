import { memo, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/class-names/class-names';
import s from './layout.module.scss';
import { HStack, VStack } from '@/shared/ui/stack';
import { Text, TextSize, TextTheme } from '@/shared/ui/text';

interface LayoutProps {
  className?: string;
}

export const Layout = memo((props: PropsWithChildren<LayoutProps>) => {
  const { className, children } = props;

  return (
    <VStack
      full
      gap={44}
      align="center"
      justify="start"
      className={classNames(s.layout, {}, [className])}
    >
      {children}
      <HStack
        className={s.footer}
        justify="end"
      >
        <Text
          theme={TextTheme.SECONDARY}
          text="2024 ОАО «РЖД», Международная выставка-форум «Россия»"
          size={TextSize['12_12']}
        />
      </HStack>
    </VStack>
  );
});
