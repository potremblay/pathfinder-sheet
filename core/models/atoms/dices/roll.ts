import { strToDice } from './strToDice';
import type { Dice, DiceResult, DiceStr } from './type';

export function roll<Q extends number, S extends number>(diceDef: Dice<Q, S>): DiceResult<Q, S>;
export function roll<Q extends number, S extends number>(diceDef: DiceStr): DiceResult<Q, S>;

export function roll<Q extends number, S extends number>(
  diceDef: Dice<Q, S> | DiceStr
): DiceResult<Q, S> {
  const dice = typeof diceDef === 'string' ? strToDice<Q, S>(diceDef) : diceDef;

  let result = 0;
  for (let i = 0; i < dice.quantity; i++) {
    result += Math.round(Math.random() * dice.nbSides);
  }

  return {
    quantity: dice.quantity,
    nbSides: dice.nbSides,
    result: result,
  };
}
