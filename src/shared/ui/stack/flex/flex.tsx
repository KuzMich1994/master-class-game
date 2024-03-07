import { DetailedHTMLProps, HTMLAttributes, memo, PropsWithChildren } from 'react';
import { classNames, Mods } from '@/shared/lib/class-names/class-names';
import s from './flex.module.scss';

export type FlexJustify = 'start' | 'end' | 'center' | 'between';
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch';
export type FlexDirection = 'row' | 'column';
export type FlexGap = 4 | 6 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 78 | 106;

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  className?: string;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  full?: boolean;
  wrap?: boolean;
  autoLayout?: boolean;
}

const justifyClasses: Record<FlexJustify, string> = {
  center: s.justifyCenter,
  end: s.justifyEnd,
  start: s.justifyStart,
  between: s.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: s.alignStart,
  end: s.alignEnd,
  center: s.alignCenter,
  stretch: s.alignStretch,
};

const directionClasses: Record<FlexDirection, string> = {
  row: s.directionRow,
  column: s.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: s.gap4,
  6: s.gap6,
  8: s.gap8,
  12: s.gap12,
  16: s.gap16,
  20: s.gap20,
  24: s.gap24,
  28: s.gap28,
  32: s.gap32,
  36: s.gap36,
  40: s.gap40,
  44: s.gap44,
  48: s.gap48,
  78: s.gap78,
  106: s.gap106,
};

export const Flex = memo((props: PropsWithChildren<FlexProps>) => {
  const {
    className,
    gap,
    align = 'center',
    justify = 'start',
    direction = 'row',
    full,
    wrap,
    children,
    autoLayout,
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  const mods: Mods = {
    [s.max]: full,
    [s.wrap]: wrap,
    [s.autoLayout]: autoLayout,
  };

  return (
    <div
      className={classNames(s.flex, mods, classes)}
      {...otherProps}
    >
      {children}
    </div>
  );
});
