import { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/class-names/class-names';
import s from './app-link.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum AppLinkFontSize {
  '24_32' = 'size-24-32',
  '32_43' = 'size-32-43',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  size?: AppLinkFontSize;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    className,
    to,
    theme = AppLinkTheme.PRIMARY,
    size = AppLinkFontSize['24_32'],
    children,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(s.appLink, {}, [className, s[theme], s[size]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
