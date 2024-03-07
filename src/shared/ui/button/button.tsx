import { ButtonHTMLAttributes, memo, PropsWithChildren } from 'react';
import { classNames, Mods } from '@/shared/lib/class-names/class-names';
import s from './button.module.scss';

export enum ButtonTheme {
  PRIMARY = 'primary',
  CLEAR = 'clear',
  SECONDARY = 'secondary',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  full?: boolean;
}

export const Button = memo((props: PropsWithChildren<ButtonProps>) => {
  const { className, theme = ButtonTheme.PRIMARY, full, children, disabled, ...otherProps } = props;

  const mods: Mods = {
    [s.fullWidth]: full,
    [s.disabled]: disabled,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(s.button, mods, [className, s[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
