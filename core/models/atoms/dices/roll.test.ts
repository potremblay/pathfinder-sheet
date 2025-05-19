import { roll } from './roll';

describe('roll', () => {
  let mathRandomSpy: jest.SpyInstance;

  beforeEach(() => {
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  it('rolls numeric dice definition with mocked Math.random', () => {
    const result = roll({ quantity: 2, nbSides: 6 });

    expect(result.result).toBe(6);
    expect(result.quantity).toBe(2);
    expect(result.nbSides).toBe(6);
    expect(mathRandomSpy).toHaveBeenCalledTimes(result.quantity);
  });

  it('rolls string dice definition with mocked Math.random', () => {
    const result = roll('4d12');

    expect(result.result).toBe(24);
    expect(result.quantity).toBe(4);
    expect(result.nbSides).toBe(12);
    expect(mathRandomSpy).toHaveBeenCalledTimes(result.quantity);
  });
});
