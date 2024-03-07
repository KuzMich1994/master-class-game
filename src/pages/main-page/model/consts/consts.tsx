import { MainPageSchema } from '../types/main-page-schema';
import { Icon } from '@/shared/ui/icon/icon';
import SuperVisorIcon from '@/shared/assets/icons/super-visor.svg';
import VideoIcon from '@/shared/assets/icons/video.svg';
import TrainIcon from '@/shared/assets/icons/train.svg';
import AnaliseIcon from '@/shared/assets/icons/analise.svg';
import CalendarIcon from '@/shared/assets/icons/edit-calendar.svg';
import MonitoringIcon from '@/shared/assets/icons/monitoring.svg';

export const MAIN_PAGE_LINKS: MainPageSchema[] = [
  {
    id: 1,
    icon: <Icon Svg={SuperVisorIcon} />,
    title: 'Интеллектуальный помощник для&nbsp;адаптации новых сотрудников',
  },
  {
    id: 2,
    icon: <Icon Svg={VideoIcon} />,
    title: 'Система видеоанализа трудовой деятельности сотрудников',
  },
  {
    id: 3,
    icon: <Icon Svg={TrainIcon} />,
    title: 'Энергоэффективное вождение&nbsp;поезда',
  },
  {
    id: 4,
    icon: <Icon Svg={AnaliseIcon} />,
    title: 'Автоматический анализ<br/>текста',
  },
  {
    id: 5,
    icon: <Icon Svg={CalendarIcon} />,
    title: 'Интеллектуальное построение расписаний',
  },
  {
    id: 6,
    icon: <Icon Svg={MonitoringIcon} />,
    title: 'Система обнаружения<br/>дефектов инфраструктуры',
  },
];
