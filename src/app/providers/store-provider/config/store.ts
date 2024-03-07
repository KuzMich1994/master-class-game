import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './state-schema';
import { createReducerManager } from './reducer-manager';
import { questGameReducer } from '@/entities/quest-game';

export const createReduxStore = (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    game: questGameReducer,
  };

  const reducerManager = createReducerManager(rootReducer);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
