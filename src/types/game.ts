export type GameItem = {
  id: string;
  label: string;
  imageUrl: string;
  audioUrl?: string;
  emoji?: string;
};

export type GameMode = {
  id: string;
  label: string;
  emoji?: string;
  items: GameItem[];
};

export type Question = {
  answer: GameItem;
  choices: GameItem[];
};

export type ScreenState = 'title' | 'countdown' | 'playing' | 'cleared';
