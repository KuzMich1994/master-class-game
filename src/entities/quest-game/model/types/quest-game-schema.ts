export interface Card {
  id: string;
  text: string;
}

export interface Column {
  id: string;
  card?: Card;
  correctCardId: string;
}

export interface QuestArea {
  id?: string;
  title?: string;
  source?: Card[];
  target?: Column[];
  correctSequence?: string[];
  question?: string;
}

export interface QuestGameSchema {
  data?: QuestArea;
}
