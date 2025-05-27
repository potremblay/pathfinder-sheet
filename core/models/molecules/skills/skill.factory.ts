import { Skill, SkillDefinition } from './skill.types';

export const createSkill = (
  definition: SkillDefinition
): Skill => {
  return {
    name: definition.name,
    proficiency: 'untrained',
    item: 0,
  };
};