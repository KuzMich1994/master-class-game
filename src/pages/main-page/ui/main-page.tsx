import { memo } from 'react';
import { classNames } from '@/shared/lib/class-names/class-names';
import s from './main-page.module.scss';
import { AppLink } from '@/shared/ui/app-link';
import { getRouteQuestions } from '@/shared/const/routes/routes';
import { HStack, VStack } from '@/shared/ui/stack';
import { Text, TextSize, TextTheme } from '@/shared/ui/text';
import { MAIN_PAGE_LINKS } from '../model/consts/consts';
import { Card } from '@/shared/ui/card';
import { Icon } from '@/shared/ui/icon/icon';
import LogoIcon from '@/shared/assets/icons/logo.svg';

interface MainPageProps {
  className?: string;
}

const MainPage = memo((props: MainPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(s.mainPage, {}, [className])}>
      <VStack
        gap={48}
        full
        align="center"
      >
        <Icon
          Svg={LogoIcon}
          className={s.icon}
        />
        <Text
          theme={TextTheme.SECONDARY}
          size={TextSize['20_20']}
          text="Выберите модуль для построения модели сервиса"
        />
        <HStack gap={24}>
          <VStack
            gap={24}
            full
          >
            {MAIN_PAGE_LINKS.filter((link) => link.id < 4).map((link) => (
              <AppLink
                className={s.link}
                to={getRouteQuestions(link.id)}
              >
                <Card className={s.linkCard}>
                  <VStack
                    align="start"
                    gap={16}
                  >
                    {link.icon}
                    <div
                      className={classNames(s.text)}
                      dangerouslySetInnerHTML={{ __html: link.title }}
                    />
                  </VStack>
                </Card>
              </AppLink>
            ))}
          </VStack>
          <VStack
            gap={24}
            full
          >
            {MAIN_PAGE_LINKS.filter((link) => link.id >= 4).map((link) => (
              <AppLink
                className={s.link}
                to={getRouteQuestions(link.id)}
              >
                <Card className={s.linkCard}>
                  <VStack
                    align="start"
                    gap={16}
                  >
                    {link.icon}
                    <div
                      className={classNames(s.text)}
                      dangerouslySetInnerHTML={{ __html: link.title }}
                    />
                  </VStack>
                </Card>
              </AppLink>
            ))}
          </VStack>
        </HStack>
      </VStack>
    </div>
  );
});

export default MainPage;
