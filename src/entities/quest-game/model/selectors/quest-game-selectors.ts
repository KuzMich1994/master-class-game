import { StateSchema } from '@/app/providers/store-provider';

export const getQuestGameSource = (state: StateSchema) => state.game.data?.source || [];
export const getQuestGameTarget = (state: StateSchema) => state.game.data?.target || [];
export const getQuestGameQuestion = (state: StateSchema) => state.game.data?.question ?? '';
export const getQuestGameTitle = (state: StateSchema) => state.game.data?.title ?? '';
export const getQuestGameCorrectSequence = (state: StateSchema) => state.game.data?.correctSequence;
