import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestGameSchema, QuestArea } from '../types/quest-game-schema';

const initialState: QuestGameSchema = {};

const questGameSlice = createSlice({
  initialState,
  name: 'quest-game',
  reducers: {
    setQuestGameData: (state, action: PayloadAction<QuestArea | undefined>) => {
      state.data = action.payload;
    },
  },
});

export const { actions: questGameActions, reducer: questGameReducer } = questGameSlice;
