export type Attribute =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type HasAttributes = {
  attributes: Record<Attribute, number>;
};
