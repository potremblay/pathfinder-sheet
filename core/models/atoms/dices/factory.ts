import type { Dice } from './type';

export function DiceFactory<Q extends number, S extends number>(
  quantity: Q,
  nbSides: S
): Dice<Q, S> {
  return {
    nbSides: nbSides,
    quantity: quantity,
  };
}
