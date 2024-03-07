import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { QuestGameSchema } from '@/entities/quest-game';

export interface StateSchema {
  game: QuestGameSchema;
  test?: {};
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
  reducerManager: ReducerManager;
}
