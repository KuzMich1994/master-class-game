import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/class-names/class-names';
import s from './text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
  DESCRIPTION = 'description',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  '12_12' = 'size-12-12',
  '12_12_sb' = 'size-12-12_sb',
  '14_14' = 'size-14-14',
  '14_14_sb' = 'size-14-14_sb',
  '20_20' = 'size-20-20',
  '20_20_sb' = 'size-20-20_sb',
  '22_22' = 'size-22-22',
  '22_22_sb' = 'size-22-22_sb',
  '24_30' = 'size-24-30',
  '24_30_sb' = 'size-24-30_sb',
  '24_32' = 'size-24-32',
  '24_32_sb' = 'size-24-32_sb',
  '26_26' = 'size-26-26',
  '26_26_sb' = 'size-26-26_sb',
  '26_32' = 'size-26-32',
  '26_32_sb' = 'size-26-32_sb',
  '26_35' = 'size-26-35',
  '26_35_sb' = 'size-26-35_sb',
  '32_32' = 'size-32-32',
  '32_32_sb' = 'size-32-32_sb',
  'montserrat-32_32' = 'size-montserrat-32-32',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  hasElementTitle?: boolean;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize['12_12']]: 'h5',
  [TextSize['12_12_sb']]: 'h5',
  [TextSize['14_14']]: 'h5',
  [TextSize['14_14_sb']]: 'h5',
  [TextSize['20_20']]: 'h4',
  [TextSize['20_20_sb']]: 'h4',
  [TextSize['22_22']]: 'h4',
  [TextSize['22_22_sb']]: 'h4',
  [TextSize['24_30']]: 'h3',
  [TextSize['24_30_sb']]: 'h3',
  [TextSize['24_32']]: 'h3',
  [TextSize['24_32_sb']]: 'h3',
  [TextSize['26_32']]: 'h2',
  [TextSize['26_32_sb']]: 'h2',
  [TextSize['26_35']]: 'h2',
  [TextSize['26_35_sb']]: 'h2',
  [TextSize['26_26']]: 'h2',
  [TextSize['26_26_sb']]: 'h2',
  [TextSize['32_32']]: 'h1',
  [TextSize['32_32_sb']]: 'h1',
  [TextSize['montserrat-32_32']]: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    hasElementTitle,
    title,
    size = TextSize['22_22'],
    theme = TextTheme.PRIMARY,
    text,
    align = TextAlign.LEFT,
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  const mods: Mods = {
    [s[align]]: true,
    [s[size]]: true,
  };

  return (
    <div className={classNames(s.text, mods, [className, s[theme]])}>
      {title && (
        <HeaderTag
          title={hasElementTitle ? title : undefined}
          className={s.title}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p
          title={hasElementTitle ? text : undefined}
          className={s.text}
        >
          {text}
        </p>
      )}
    </div>
  );
});
