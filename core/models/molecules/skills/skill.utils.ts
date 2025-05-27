import { Character } from 'core/models/organisms/character/types';
import getModifier from '../../atoms/modifiers/getModifier';
import getProficiencyBonus from '../../atoms/proficiency/getProficiencyBonus';
import { SKILL_DEFINITIONS } from './skill.definitions';
import { Skill, SkillDefinition } from './skill.types';
import { getArmorPenalty } from 'core/models/atoms/armor/armor.utils';
import { Attribute } from 'core/models/atoms/attributes/types';

const armorPenaltyAttributes = new Set<Attribute>(['dexterity', 'strength']);

export function getSkillDefinitionByName(
  skillName: string,
  definitions = SKILL_DEFINITIONS
): SkillDefinition | undefined {
  return definitions.find((def) => def.name === skillName);
}

export function isSkillHaveArmorPenalty(skillDef: SkillDefinition): boolean {
  return  armorPenaltyAttributes.has(skillDef.attribute);
}

export function getSkillAttributeModifier(skill: Skill, character: Character): number {
  const skillDef = getSkillDefinitionByName(skill.name, character.skillDefinitions);

  if (!skillDef?.attribute) {
    throw new Error(`Skill ${skill.name} not found in definition`);
  }

  return getModifier(character.attributes[skillDef?.attribute]);
}

export function getSkillScore(skill: Skill, character: Character): number {
  const attributeModifier = getSkillAttributeModifier(skill, character);
  const proficiencyBonus = getProficiencyBonus(skill.proficiency, character.level);

  const skillDef = getSkillDefinitionByName(skill.name);
  const armorPenalty = skillDef && isSkillHaveArmorPenalty(skillDef)
    ? getArmorPenalty(character.armor.type, character.attributes.strength)
    : 0;

  return attributeModifier + proficiencyBonus + skill.item + armorPenalty;
}
