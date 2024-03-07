import { memo, ReactElement, SVGProps } from 'react';
import { classNames } from '@/shared/lib/class-names/class-names';
import s from './icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  Svg: (props: SVGProps<SVGSVGElement>) => ReactElement;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, ...otherProps } = props;

  return (
    <Svg
      className={classNames(s.icon, {}, [className])}
      {...otherProps}
    />
  );
});
