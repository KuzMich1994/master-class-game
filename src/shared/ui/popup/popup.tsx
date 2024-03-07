import { PropsWithChildren } from 'react';
import s from './popup.module.scss'; // подключаем файл стилей

import step1 from '@/shared/assets/icons/background.svg';
import step2 from '@/shared/assets/icons/circle.svg';
import step3 from '@/shared/assets/icons/check-mark.svg';
import { Icon } from '../icon/icon';
import { classNames } from '@/shared/lib/class-names/class-names';

interface PopupProps {
  isOpen?: boolean;
  onClose: () => void;
  className?: string;
  closeOnClickOutside?: boolean;
}

const Popup = (props: PropsWithChildren<PopupProps>) => {
  const { children, onClose, isOpen, closeOnClickOutside = true, className } = props;
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (closeOnClickOutside && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <div className={classNames(s.popupContainer, {}, [className])}>
        <div
          className={s.popup}
          onClick={handleOutsideClick}
        >
          {children}
          <div className={`${s.background} `}>
            <Icon Svg={step1} />
          </div>
          <div className={`${s.circle} `}>
            <Icon Svg={step2} />
          </div>
          <div className={`${s.check}`}>
            <Icon Svg={step3} />
          </div>
          <p className={s.text}>Правильно</p>
        </div>
      </div>
    )
  );
};

export default Popup;
