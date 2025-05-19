import { attributeBoostEffect } from './attributeBoostEffect';
import type { HasAttributes } from './types';

describe('attributeBoostEffect', () => {
  const mockEntity: HasAttributes = {
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
  };

  it('should boost attribute by putting +2 in a attribute', () => {
    const newEntity = attributeBoostEffect('wisdom').apply(mockEntity);

    expect(newEntity.attributes.wisdom).toEqual(12);
    expect(newEntity).not.toBe(mockEntity);
  });

  it('should be able to reverse boost', () => {
    const effect = attributeBoostEffect('wisdom');
    const newEntity = effect.apply(mockEntity);
    const revertedEntity = effect.revert(newEntity);

    expect(revertedEntity.attributes.wisdom).toEqual(10);
    expect(newEntity).not.toBe(mockEntity);
    expect(revertedEntity).not.toBe(newEntity);
  });
});
