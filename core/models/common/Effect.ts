export type Effect<T> = {
  apply(obj: T): T;
  revert(obj: T): T;
};

export type EffectFactory<T> = (...args: any[]) => Effect<T>;
