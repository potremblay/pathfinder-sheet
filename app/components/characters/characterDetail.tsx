'use client';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Edit, Eye } from 'lucide-react';
import AttributeEditor from '~/components/characters/attributeEditor';
import { roll } from 'core/models/atoms/dices/roll';
import { Character } from 'core/models/organisms/character/types';
import SkillList from '~/components/characters/skillList';
import { Skill } from 'core/models/molecules/skills/skill.types';
import { Proficiency } from 'core/models/atoms/proficiency/type';
import { useState } from 'react';

type Props = {
  character: Character;
};



export default function CharacterDetail({ character: initialCharacter }: Props) {
  const [isEditing, setIsEditing] = useState(true);
  const [character, setCharacter] = useState(initialCharacter);

  const [characterInfo, setCharacterInfo] = useState({
    characterName: '',
    playerName: '',
    ancestry: '',
    heritage: '',
    notes: '',
  });

  const handleInfoChange = (field: string, value: string) => {
    setCharacterInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onChangeAttributeFactory = (attribute: string): ((newValue: number) => void) => {
    return (value: number) => {
      setCharacter((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attribute]: value,
        },
      }));
    };
  };

  const onProficiencyChange = (skill: Skill, proficiency: Proficiency) => {
    setCharacter((prevCharacter) => {
      const updatedSkills = [...prevCharacter.skills].map((prevSkill) => {
        const newSkill = {...prevSkill}
        if (newSkill.name === skill.name) {
          newSkill.proficiency = proficiency;
        }
        return newSkill;
      });

      return {
        ...prevCharacter,
        skills: updatedSkills,
      };
    });
  };

  const onRollFactory = (attribute: string): (() => void) => {
    const onChange = onChangeAttributeFactory(attribute);

    return () => {
      onChange(roll('1d20').result);
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Pathfinder Character Sheet</h1>
          <Button
            variant={isEditing ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            {isEditing ? <Eye className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            {isEditing ? 'View Mode' : 'Edit Mode'}
          </Button>
        </div>
        <p className="text-muted-foreground">
          {isEditing ? 'Edit your character details' : 'View your character sheet'}
        </p>
      </div>

      {/* Character Information */}
      <Card>
        <CardHeader>
          <CardTitle>Character Information</CardTitle>
          <CardDescription>Basic details about your character</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="character-name">Character Name</Label>
            {isEditing ? (
              <Input
                id="character-name"
                placeholder="Enter character name"
                value={characterInfo.characterName}
                onChange={(e) => handleInfoChange('characterName', e.target.value)}
              />
            ) : (
              <div className="p-2 min-h-[40px] border rounded-md bg-muted/50">
                {characterInfo.characterName || 'No name set'}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="player-name">Player Name</Label>
            {isEditing ? (
              <Input
                id="player-name"
                placeholder="Enter player name"
                value={characterInfo.playerName}
                onChange={(e) => handleInfoChange('playerName', e.target.value)}
              />
            ) : (
              <div className="p-2 min-h-[40px] border rounded-md bg-muted/50">
                {characterInfo.playerName || 'No player name set'}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="ancestry">Ancestry</Label>
            {isEditing ? (
              <Input
                id="ancestry"
                placeholder="e.g., Human, Elf, Dwarf"
                value={characterInfo.ancestry}
                onChange={(e) => handleInfoChange('ancestry', e.target.value)}
              />
            ) : (
              <div className="p-2 min-h-[40px] border rounded-md bg-muted/50">
                {characterInfo.ancestry || 'No ancestry set'}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="heritage">Heritage</Label>
            {isEditing ? (
              <Input
                id="heritage"
                placeholder="e.g., Versatile Human, Ancient Elf"
                value={characterInfo.heritage}
                onChange={(e) => handleInfoChange('heritage', e.target.value)}
              />
            ) : (
              <div className="p-2 min-h-[40px] border rounded-md bg-muted/50">
                {characterInfo.heritage || 'No heritage set'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ability Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Ability Scores</CardTitle>
          <CardDescription>Your character's core attributes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(character.attributes).map(([attribute, value]) => (
            <AttributeEditor
              key={attribute}
              isEditing={isEditing}
              attribute={attribute}
              value={value}
              onChange={onChangeAttributeFactory(attribute)}
              onRoll={onRollFactory(attribute)}
            ></AttributeEditor>
          ))}
        </CardContent>
      </Card>

      <SkillList
        isEditing={isEditing}
        character={character}
        onProficiencyChange={onProficiencyChange}
      ></SkillList>

      {/* Character Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Character Notes</CardTitle>
          <CardDescription>Additional details about your character</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notes">Background, personality, equipment, etc.</Label>
            {isEditing ? (
              <Textarea
                id="notes"
                placeholder="Describe your character's background, personality traits, equipment, or any other important details..."
                className="min-h-[120px]"
                value={characterInfo.notes}
                onChange={(e) => handleInfoChange('notes', e.target.value)}
              />
            ) : (
              <div className="p-3 min-h-[120px] border rounded-md bg-muted/50 whitespace-pre-wrap">
                {characterInfo.notes || 'No notes added'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
