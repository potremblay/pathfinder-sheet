import type { HasAttributes } from 'core/models/atoms/attributes/types';

export type Character = HasAttributes & {
  id: string;
  name: string;
  playerName: string;
  level: number;
};
