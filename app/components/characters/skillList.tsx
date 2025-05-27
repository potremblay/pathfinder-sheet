'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import formatModifier from 'core/models/atoms/modifiers/formatModifier';
import { Proficiency } from 'core/models/atoms/proficiency/type';
import getProficiencyBonus from 'core/models/atoms/proficiency/getProficiencyBonus';
import {
  getSkillAttributeModifier,
  getSkillDefinitionByName,
  getSkillScore,
  isSkillHaveArmorPenalty,
} from 'core/models/molecules/skills/skill.utils';
import { Character } from 'core/models/organisms/character/types';
import { getArmorPenalty } from 'core/models/atoms/armor/armor.utils';
import { Skill } from 'core/models/molecules/skills/skill.types';
import { useState, useEffect } from 'react';
import {
  ProficiencyDictionary,
  ProficiencyListing,
  ProficiencyShortDictionary,
} from 'core/models/atoms/proficiency/proficiency.dictionary';

interface SkillsComponentProps {
  character: Character;
  isEditing: boolean;
  onProficiencyChange?: (skill: Skill, newValue: Proficiency) => void;
}

export default function SkillList({
  isEditing,
  character,
  onProficiencyChange,
}: SkillsComponentProps) {
  const updateProficiency = (skill: Skill, v: Proficiency) => {
    if (onProficiencyChange) {
      onProficiencyChange(skill, v);
    }
  };

  const [armorPenalty, setArmorPenalty] = useState<number | null>(null);

  useEffect(() => {
    if (character) {
      const penalty = getArmorPenalty(character.armor.type, character.attributes.strength);
      setArmorPenalty(penalty);
    }
  }, [character]);

  const formatPenalty = (penalty: number | null): string => {
    return ` - ${Math.abs(penalty ?? 0)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {character.skills.map((skill, index) => {
            const attributeModifier = getSkillAttributeModifier(skill, character);
            const proficiencyBonus = getProficiencyBonus(skill.proficiency, character.level);
            const totalScore = getSkillScore(skill, character);
            const skillDef = getSkillDefinitionByName(skill.name);
            const affectedByArmor = skillDef && isSkillHaveArmorPenalty(skillDef);

            return (
              <div key={skill.name} className="flex items-center gap-2 py-1 text-sm">
                {/* Skill Name */}
                <div className="w-24 font-medium text-xs">{skill.name}</div>

                {/* Total Score */}
                <div className="w-8 text-center font-bold text-base">
                  {formatModifier(totalScore)}
                </div>

                {/* Proficiency */}
                <div className="w-16">
                  {isEditing ? (
                    <Select
                      value={skill.proficiency}
                      onValueChange={(value: Proficiency) => updateProficiency(skill, value)}
                    >
                      <SelectTrigger className="h-6 text-xs">
                        <SelectValue placeholder={skill.proficiency || '—'} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ProficiencyShortDictionary).map(([value, label]) => (
                          <SelectItem value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-center text-xs font-medium">
                      {skill.proficiency === 'untrained' ? '—' : skill.proficiency}
                    </div>
                  )}
                </div>

                {/* Formula */}
                <div className="flex-1 text-xs text-muted-foreground">
                  <span className="font-mono">
                    {attributeModifier} + {proficiencyBonus}
                    {skill.item !== 0 && ` + ${skill.item}`}
                    {affectedByArmor && `${formatPenalty(armorPenalty)}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {isEditing && (
          <div className="mt-4 pt-2 border-t">
            <div className="flex gap-4 text-xs text-muted-foreground">
              {ProficiencyListing.map((proficiency) => (
                <div>
                  {ProficiencyShortDictionary[proficiency]} = {ProficiencyDictionary[proficiency]} (
                  {formatModifier(getProficiencyBonus(proficiency, character.level))})
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
