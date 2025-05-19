import type { Dice, DiceStr } from './type';

export function strToDice<Q extends number, S extends number>(label: DiceStr): Dice<Q, S> {
  const [quantity, nbSides] = label.split('d').map((s) => Number(s));

  return { quantity: quantity as Q, nbSides: nbSides as S };
}
