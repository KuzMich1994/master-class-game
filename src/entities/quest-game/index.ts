import { QuestGame } from './ui/quest-game/quest-game';
import { QuestGameSchema, QuestArea } from './model/types/quest-game-schema';
// import questGameData from './model/db/game.db.json';
import { questGameActions, questGameReducer } from './model/slices/quest-game-slice';
import { getQuestGameQuestion } from './model/selectors/quest-game-selectors';
import { QUEST_GAME_DATA } from './model/consts/const';

export {
  QuestGame,
  type QuestGameSchema,
  type QuestArea,
  questGameActions,
  questGameReducer,
  getQuestGameQuestion,
  QUEST_GAME_DATA,
};
