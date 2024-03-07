import { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { QUEST_GAME_DATA, QuestGame, questGameActions } from '@/entities/quest-game';
import { VStack } from '@/shared/ui/stack';
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch/use-app-dispatch';
import { getRouteMain } from '@/shared/const/routes/routes';
import s from './questions-page.module.scss';

interface QuestionsPageProps {
  className?: string;
}

const QuestionsPage = memo((props: QuestionsPageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundedGame = QUEST_GAME_DATA.find((game) => game.id === id);
      if (foundedGame) {
        dispatch(questGameActions.setQuestGameData(foundedGame));
      } else {
        navigate(getRouteMain());
      }
    }
  }, [dispatch, id, navigate]);

  return (
    <VStack
      gap={24}
      full
      autoLayout
      className={s.game}
    >
      <QuestGame gameId={id} />
    </VStack>
  );
});

export default QuestionsPage;
