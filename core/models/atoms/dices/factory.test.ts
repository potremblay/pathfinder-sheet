import { DiceFactory } from './factory';

describe('DiceFactory', () => {
  it('should return a dice', () => {
    const result = DiceFactory(2, 12);

    expect(result.nbSides).toBe(12);
    expect(result.quantity).toBe(2);
  });
});
