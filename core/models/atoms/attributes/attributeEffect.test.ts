import { attributeEffect } from './attributeEffect';
import type { HasAttributes } from './types';

describe('attributeEffect', () => {
  const mockEntity: HasAttributes = {
    attributes: {
      strength: 10,
      dexterity: 12,
      constitution: 14,
      intelligence: 8,
      wisdom: 11,
      charisma: 9,
    },
  };

  it('should apply an attribute increase', () => {
    const effect = attributeEffect('strength', 2);
    const result = effect.apply(mockEntity);

    expect(result.attributes.strength).toBe(12);
    expect(result).not.toBe(mockEntity); // Check immutability
  });

  it('should apply an attribute decrease', () => {
    const effect = attributeEffect('dexterity', -1);
    const result = effect.apply(mockEntity);

    expect(result.attributes.dexterity).toBe(11);
    expect(result).not.toBe(mockEntity);
  });

  it('should revert a previously applied effect', () => {
    const effect = attributeEffect('constitution', 3);
    const applied = effect.apply(mockEntity);
    const reverted = effect.revert(applied);

    expect(reverted.attributes.constitution).toBe(mockEntity.attributes.constitution);
    expect(reverted).not.toBe(applied); // Still immutability
  });

  it('should not modify the original entity', () => {
    const originalCopy = structuredClone(mockEntity);
    const effect = attributeEffect('wisdom', 5);

    effect.apply(mockEntity);
    effect.revert(mockEntity);

    expect(mockEntity).toEqual(originalCopy);
  });
});
