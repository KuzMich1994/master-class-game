import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import s from './quest-card.module.scss';
import { Card } from '@/shared/ui/card';
import { Card as CardType, Column } from '../../model/types/quest-game-schema';
import { classNames } from '@/shared/lib/class-names/class-names';

interface QuestCardProps {
  className?: string;
  id: string;
  text?: string;
  card?: CardType;
  column?: Column;
  disabled?: boolean;
}

export const QuestCard = memo((props: QuestCardProps) => {
  const { className, text, id, card, column, disabled } = props;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { card, column },
    disabled,
  });

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  return (
    <div
      className={s.card}
      ref={setNodeRef}
      style={{
        ...style,
      }}
      {...attributes}
      {...listeners}
    >
      <Card className={classNames(s.cardContainer, { [s.active]: isDragging }, [className])}>{text}</Card>
    </div>
  );
});
