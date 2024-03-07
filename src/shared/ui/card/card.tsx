import { HTMLAttributes, memo, PropsWithChildren } from 'react';
import { classNames } from '../../lib/class-names/class-names';
import s from './card.module.scss';

export enum CardTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  withoutShadow?: boolean;
  theme?: CardTheme;
}

export const Card = memo((props: PropsWithChildren<CardProps>) => {
  const { className, children, withoutShadow, theme = CardTheme.PRIMARY, ...otherProps } = props;

  return (
    <div
      className={classNames(s.card, { [s.withoutShadow]: withoutShadow }, [className, s[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
