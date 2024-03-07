import { memo, PropsWithChildren } from 'react';
import s from './header-row.module.scss';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Button, ButtonTheme } from '@/shared/ui/button';
import { browserHistory } from '@/shared/const/history/history';
import { getRouteMain } from '@/shared/const/routes/routes';
import { Icon } from '@/shared/ui/icon/icon';
import BackIcon from '@/shared/assets/icons/left.svg';
import { HStack, VStack } from '@/shared/ui/stack';
import { Text, TextSize } from '@/shared/ui/text';

interface HeaderRowProps {
  className?: string;
  title?: string;
  backButtonTheme?: ButtonTheme;
}

const HeaderRow = memo((props: PropsWithChildren<HeaderRowProps>) => {
  const { className, title, backButtonTheme = ButtonTheme.SECONDARY, children } = props;

  return (
    <HStack
      full
      align="start"
      className={classNames(s.headerRow, {}, [className])}
    >
      <Button
        className={s.back}
        theme={backButtonTheme}
        onClick={() => browserHistory.push(getRouteMain())}
      >
        <Icon Svg={BackIcon} />
      </Button>
      <HStack
        gap={48}
        justify="between"
        align="start"
        full
      >
        <VStack
          className={s.titleContainer}
          align="start"
        >
          <Text
            title={title}
            size={TextSize['montserrat-32_32']}
          />
        </VStack>
        {children}
      </HStack>
    </HStack>
  );
});

export default HeaderRow;
