import { attributeBoostEffect } from 'core/models/atoms/attributes/attributeBoostEffect';
import { attributeEffect } from 'core/models/atoms/attributes/attributeEffect';
import { FactoryRegistry } from 'core/registry/FactoryRegistry';

const effectRegistry = new FactoryRegistry();

effectRegistry.register('attribute', attributeEffect);
effectRegistry.register('attributeBoost', attributeBoostEffect);

export default effectRegistry;
