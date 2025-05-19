export type Dice<Q extends number, S extends number> = {
  quantity: Q;
  nbSides: S;
};

export type DiceResult<Q extends number, S extends number> = Dice<Q, S> & {
  result: number;
};

export type DiceStr = `${number}d${number}`;
