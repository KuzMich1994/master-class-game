export enum Routes {
  MAIN = 'main',
  QUESTIONS = 'questions',
  DIAGRAM = 'diagram',
}

export const getRouteMain = () => '/';
export const getRouteQuestions = (id: string | number) => `/${Routes.QUESTIONS}/${id}`;
export const getRouteDiagram = (id: string | number) => `/${Routes.DIAGRAM}/${id}`;
