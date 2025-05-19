import type { EffectFactory } from 'core/models/common/Effect';
import { attributeEffect } from './attributeEffect';
import type { HasAttributes, Attribute } from './types';

export const attributeBoostEffect: EffectFactory<HasAttributes> = (attribute: Attribute) => {
  return attributeEffect(attribute, 2);
};
