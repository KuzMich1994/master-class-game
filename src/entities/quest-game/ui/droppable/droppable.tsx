import { useDroppable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Column } from '../../model/types/quest-game-schema';

interface DroppableProps {
  id: string;
  index?: string;
  className?: string;
  column?: Column;
}

export function Droppable(props: PropsWithChildren<DroppableProps>) {
  const { id, children, index, className, column } = props;

  const { setNodeRef } = useDroppable({ id, data: { index, column } });

  return (
    <div
      // style={{ position: 'relative' }}
      ref={setNodeRef}
      className={classNames('', {}, [className])}
    >
      {children}
    </div>
  );
}
