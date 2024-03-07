import { memo, MutableRefObject, useEffect, useRef, useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { animated, useSpring } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { HStack, VStack } from '@/shared/ui/stack';
import {
  getQuestGameCorrectSequence,
  getQuestGameSource,
  getQuestGameTarget,
  getQuestGameTitle,
} from '../../model/selectors/quest-game-selectors';
import { Card, Column } from '../../model/types/quest-game-schema';
import { Text, TextSize, TextTheme } from '@/shared/ui/text';
import { Card as CardUi, CardTheme } from '@/shared/ui/card';
import { Icon } from '@/shared/ui/icon/icon';
import InfoIcon from '@/shared/assets/icons/info.svg';
import CancelIcon from '@/shared/assets/icons/cancel.svg';
import CheckIcon from '@/shared/assets/icons/check.svg';
import PlatformImg from '@/shared/assets/images/platform.png';
import CardBorderImg from '@/shared/assets/images/card-border.png';
import TrainImg from '@/shared/assets/images/train.png';
import s from './quest-game.module.scss';
import { Droppable } from '../droppable/droppable';
import { QuestCard } from '../quest-card/quest-card';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { getRouteDiagram } from '@/shared/const/routes/routes';
import Popup from '@/shared/ui/popup/popup';
import { HeaderRow } from '@/entities/header-row';

interface QuestGameProps {
  className?: string;
  gameId?: string;
}

export const QuestGame = memo((props: QuestGameProps) => {
  const { className, gameId } = props;
  const navigate = useNavigate();
  const initialCards = useSelector(getQuestGameSource);
  const initialTarget = useSelector(getQuestGameTarget);
  const correctSequence = useSelector(getQuestGameCorrectSequence);
  const title = useSelector(getQuestGameTitle);
  const [checked, setChecked] = useState(false);

  const [sourceCards, setSourceCards] = useState<Card[]>(initialCards);
  const [targetColumns, setTargetColumns] = useState<Column[]>(initialTarget);
  const [springs, api] = useSpring(() => ({ from: { x: '-200%' }, config: { duration: 800 } }));
  const [springsImg, apiImg] = useSpring(() => ({ from: { x: '0', opacity: 1 }, config: { duration: 800 } }));
  const timeout = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const popupTimeout = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const disabledTimeout = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const errorTimeout = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const [activeCard, setActiveCard] = useState<Card | undefined>(undefined);
  // const [overedColumn, setOveredColumn] = useState<Column | undefined>(undefined);
  const [startDragColumn, setStartDragColumn] = useState<Column | undefined>(undefined);
  const [successPopupIsOpen, setSuccessPopupIsOpen] = useState(false);
  const [gameIsDisabled, setGameIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const buttonIsDisabled = targetColumns.filter((col) => !!col.card).length === 0;

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveCard(active.data.current?.card);
    setChecked(false);

    if (active.data.current?.column) {
      setStartDragColumn(active.data.current?.column);
    } else {
      setStartDragColumn(undefined);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.data.current?.index === 'target') {
      const updatedCards = sourceCards.filter((card) => card.id !== activeCard?.id);

      const updatedColumns = targetColumns.map((col) => {
        if (col.id === startDragColumn?.id) {
          return {
            ...col,
            card: over.data.current?.column?.card,
          };
        }
        if (col.id === over.id) {
          if (!startDragColumn) {
            if (col.card) {
              if (col.card.id !== activeCard?.id) {
                updatedCards.push(col.card);
              }
            }
          }
          return {
            ...col,
            card: activeCard,
          };
        }

        return col;
      });

      setSourceCards(updatedCards);
      setTargetColumns(updatedColumns);
    }

    if (over?.id === 'source') {
      const updatedSourceCards = sourceCards;
      const targetCols = targetColumns.map((col) => {
        if (col.card?.id === active.id) {
          updatedSourceCards.push(col.card);
          col.card = undefined;
        }

        return col;
      });

      setSourceCards(updatedSourceCards);
      setTargetColumns(targetCols);
      setActiveCard(undefined);
      setStartDragColumn(undefined);
    }
  };

  const handleReset = () => {
    setSourceCards(initialCards);
    setTargetColumns([...initialTarget]);
    clearTimeout(timeout.current);
    clearTimeout(popupTimeout.current);
    clearTimeout(disabledTimeout.current);
    setChecked(false);
  };

  const checkSequence = () => {
    const targetIds = targetColumns.map((col) => col.card?.id).filter(Boolean);
    clearTimeout(errorTimeout.current);

    if (JSON.stringify(targetIds) === JSON.stringify(correctSequence)) {
      setSuccessPopupIsOpen(true);
      api.start({
        from: {
          x: '0',
        },
        to: [
          {
            x: '-1%',
            config: {
              duration: 200,
            },
          },
          {
            x: '0',
            config: {
              duration: 100,
            },
          },
          {
            x: '150%',
            config: {
              duration: 4000,
            },
            delay: 900,
          },
        ],
        config: {
          duration: 500,
        },
        delay: 3500,
      });
      apiImg.start({
        from: {
          x: '200%',
          opacity: 0,
        },
        to: {
          x: '0',
          opacity: 1,
        },
        config: {
          duration: 1500,
        },
        delay: 2000,
      });
      setGameIsDisabled(true);
      timeout.current = setTimeout(() => {
        handleReset();
        navigate(getRouteDiagram(gameId ?? ''));
      }, 8000);
      popupTimeout.current = setTimeout(() => {
        setSuccessPopupIsOpen(false);
      }, 2000);
    } else {
      setIsError(true);
      errorTimeout.current = setTimeout(() => {
        setIsError(false);
      }, 3000);
    }

    setChecked(true);
  };

  useEffect(() => {
    if (initialCards && initialTarget) {
      setSourceCards([...initialCards]);
      setTargetColumns([...initialTarget]);
    }
    disabledTimeout.current = setTimeout(() => setGameIsDisabled(false), 4400);
    api.start({
      from: {
        x: '-100%',
      },
      to: [
        {
          x: '1%',
          config: {
            duration: 4000,
          },
        },
        {
          x: '0',
          config: {
            duration: 400,
          },
        },
      ],
    });
    apiImg.start({
      from: {
        x: '0',
      },
      to: [
        {
          x: '200%',
          config: {
            duration: 2000,
          },
        },
      ],
      delay: 4400,
    });
  }, [api, apiImg, initialCards, initialTarget]);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={onDragStart}
    >
      <Popup
        className={s.popup}
        isOpen={successPopupIsOpen}
        onClose={() => setSuccessPopupIsOpen(false)}
      />
      <HeaderRow title={title}>
        <VStack
          gap={16}
          align="end"
        >
          <HStack gap={16}>
            <Button
              disabled={buttonIsDisabled}
              theme={ButtonTheme.SECONDARY}
              onClick={handleReset}
            >
              Сбросить
            </Button>
            <Button
              theme={buttonIsDisabled ? ButtonTheme.SECONDARY : ButtonTheme.PRIMARY}
              disabled={buttonIsDisabled}
              onClick={checkSequence}
            >
              Проверить
            </Button>
          </HStack>
          <CardUi
            className={classNames(s.infoCard, { [s.error]: isError })}
            theme={CardTheme.SECONDARY}
            withoutShadow
          >
            <HStack
              align="center"
              gap={12}
            >
              <Icon
                Svg={InfoIcon}
                className={s.infoIcon}
              />
              <VStack
                align="start"
                gap={8}
              >
                <Text
                  className={s.infoText}
                  title="Неправильно, попробуйте еще раз"
                  size={TextSize['20_20_sb']}
                />
                <Text
                  className={s.infoText}
                  title="Поезд не отправится, пока вы не дадите правильный ответ"
                  size={TextSize['14_14']}
                />
              </VStack>
            </HStack>
          </CardUi>
        </VStack>
      </HeaderRow>
      <VStack
        full
        gap={48}
      >
        <VStack
          gap={32}
          align="start"
          className={s.sourceContainer}
        >
          <VStack
            gap={24}
            align="start"
          >
            {/* <Text */}
            {/*  title={title} */}
            {/*  size={TextSize['26_32']} */}
            {/* /> */}
            <HStack gap={6}>
              <Icon Svg={InfoIcon} />
              <Text
                text="Перетащите только нужные карточки на платформы в порядке создания сервиса"
                size={TextSize['20_20']}
                theme={TextTheme.DESCRIPTION}
              />
            </HStack>
          </VStack>
          <Droppable
            id="source"
            className={s.sourceDropable}
          >
            <HStack
              gap={16}
              wrap
            >
              {[...sourceCards]
                .sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1))
                .map((card) => (
                  <QuestCard
                    disabled={gameIsDisabled}
                    key={card.id}
                    id={card.id}
                    text={card.text}
                    card={card}
                  />
                ))}
            </HStack>
          </Droppable>
        </VStack>
        <animated.div style={{ ...springs, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <HStack
            full
            align="start"
          >
            {targetColumns.map((col) => (
              <Droppable
                id={col.id}
                key={col.id}
                index="target"
                className={s.target}
                column={col}
              >
                <HStack
                  justify="center"
                  className={classNames(s.checkIcon, { [s.checked]: checked })}
                >
                  {col.correctCardId === col.card?.id ? <Icon Svg={CheckIcon} /> : <Icon Svg={CancelIcon} />}
                </HStack>
                <div
                  style={{ backgroundImage: `url(${CardBorderImg})` }}
                  className={classNames(s.targetCard, { [s.hasCard]: !!col.card })}
                >
                  {col.card && (
                    <QuestCard
                      disabled={gameIsDisabled}
                      id={col.card.id}
                      text={col.card.text}
                      className={classNames(s.cardInTarget, {
                        [s.isCorrected]: checked && col.correctCardId === col.card?.id,
                        [s.isNotCorrected]: checked && col.correctCardId !== col.card.id,
                      })}
                      column={col}
                      card={col.card}
                    />
                  )}
                </div>
                <img
                  src={PlatformImg}
                  alt="platform"
                />
              </Droppable>
            ))}
          </HStack>
          <animated.img
            className={s.shadow}
            style={{ ...springsImg, flexShrink: 0, width: '763px', height: '134px' }}
            src={TrainImg}
            alt="asd"
          />
        </animated.div>
      </VStack>
    </DndContext>
  );
});
