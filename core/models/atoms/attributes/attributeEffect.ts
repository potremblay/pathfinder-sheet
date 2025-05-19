import type { EffectFactory } from 'core/models/common/Effect';
import type { HasAttributes, Attribute } from './types';

export const attributeEffect: EffectFactory<HasAttributes> = (
  attribute: Attribute,
  amount: number
) => ({
  apply(entity: HasAttributes): HasAttributes {
    const copy = structuredClone(entity);
    copy.attributes[attribute] += amount;

    return copy;
  },
  revert(entity: HasAttributes): HasAttributes {
    const copy = structuredClone(entity);
    copy.attributes[attribute] -= amount;

    return copy;
  },
});
