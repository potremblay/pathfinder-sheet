export class Registry<K, T> {
  private map = new Map<K, T>();

  public register(key: K, item: T): void {
    this.map.set(key, item);
  }

  public get(key: K) {
    return this.map.get(key);
  }
}
