import { Proficiency } from './type';

export default function getProficiencyBonus(proficiency: Proficiency, level = 1): number {
  switch (proficiency) {
    case 'T':
      return level + 2; // Trained
    case 'E':
      return level + 4; // Expert
    case 'M':
      return level + 6; // Master
    case 'L':
      return level + 8; // Legendary
    case 'untrained':
      return 0; // Untrained
    default:
      return NaN;
  }
}
