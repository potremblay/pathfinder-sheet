import { Registry } from './Registry';

export class FactoryRegistry<Key extends string> extends Registry<Key, (...args: any[]) => any> {
  public instantiate(key: Key, args: any[]) {
    const factory = this.get(key);

    if (!factory) {
      throw new Error(`Key ${key} not found in registry`);
    }

    return factory(...args);
  }
}
