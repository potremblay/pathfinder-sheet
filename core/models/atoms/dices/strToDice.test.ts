import { strToDice } from './strToDice';

describe('strToDice', () => {
  it('should return Dice', () => {
    const dice = strToDice('2d20');
    expect(dice.nbSides).toEqual(20);
    expect(dice.quantity).toEqual(2);
  });
});
