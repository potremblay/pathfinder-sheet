import { Proficiency } from 'core/models/atoms/proficiency/type';

export const ProficiencyDictionary: Record<Proficiency, string> = {
  untrained: 'Untrained',
  T: 'Trained',
  E: 'Expert',
  M: 'Master',
  L: 'Legendary',
};

export const ProficiencyShortDictionary: Record<Proficiency, string> = {
  untrained: 'U',
  T: 'T',
  E: 'E',
  M: 'M',
  L: 'L',
};

export const ProficiencyListing: Proficiency[] = ['untrained', 'T', 'E', 'M', 'L'];
