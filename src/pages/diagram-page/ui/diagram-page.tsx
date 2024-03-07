import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import s from './diagram-page.module.scss';
import { classNames } from '@/shared/lib/class-names/class-names';
import { VStack } from '@/shared/ui/stack';
import { getRouteMain } from '@/shared/const/routes/routes';
import { DiagramPageSchema } from '../model/types/diagram-page-schema';
import { DIAGRAMS } from '../model/consts/consts';
import { HeaderRow } from '@/entities/header-row';

interface DiagramPageProps {
  className?: string;
}

const DiagramPage = memo((props: DiagramPageProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const [currentSchema, setCurrentSchema] = useState<DiagramPageSchema | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const numberId = Number(id);

    if (!Number.isNaN(numberId)) {
      const foundedDiagram = DIAGRAMS.find((diagram) => diagram.id === numberId);
      if (foundedDiagram) {
        setCurrentSchema(foundedDiagram);
      } else {
        navigate(getRouteMain());
      }
    }
  }, [id, navigate]);

  return (
    <VStack
      gap={32}
      align="start"
      className={classNames(s.diagramPage, {}, [className])}
    >
      <HeaderRow title={currentSchema?.title} />
      {/* <HStack */}
      {/*  full */}
      {/*  align="center" */}
      {/*  className={s.header} */}
      {/* > */}
      {/*  <Button */}
      {/*    className={s.back} */}
      {/*    theme={ButtonTheme.PRIMARY} */}
      {/*    onClick={() => browserHistory.push(getRouteMain())} */}
      {/*  > */}
      {/*    <Icon Svg={BackIcon} /> */}
      {/*  </Button> */}
      {/*  <VStack className={s.titleContainer}> */}
      {/*    <Text */}
      {/*      title={currentSchema?.title} */}
      {/*      size={TextSize['32_32']} */}
      {/*    /> */}
      {/*  </VStack> */}
      {/* </HStack> */}
      <img
        src={currentSchema?.diagram}
        alt={currentSchema?.title}
      />
    </VStack>
  );
});

export default DiagramPage;
