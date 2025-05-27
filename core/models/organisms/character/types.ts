import { ArmorType } from 'core/models/atoms/armor/armor.type';
import type { HasAttributes } from 'core/models/atoms/attributes/types';
import { Skill, SkillDefinition } from 'core/models/molecules/skills/skill.types';

export type Character = HasAttributes & {
  id: string;
  name: string;
  playerName: string;
  level: number;
  skillDefinitions: SkillDefinition[];
  skills: Skill[],
  armor: {
    type: ArmorType,
  }
};
