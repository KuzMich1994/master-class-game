import { RouteProps } from 'react-router';
import { getRouteDiagram, getRouteMain, getRouteQuestions, Routes } from '@/shared/const/routes/routes';
import { MainPage } from '@/pages/main-page';
import { QuestionsPage } from '@/pages/questions-page';
import { DiagramPage } from '@/pages/diagram-page';

export const routerConfig: Record<Routes, RouteProps> = {
  [Routes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [Routes.QUESTIONS]: {
    path: getRouteQuestions(':id'),
    element: <QuestionsPage />,
  },
  [Routes.DIAGRAM]: {
    path: getRouteDiagram(':id'),
    element: <DiagramPage />,
  },
};
