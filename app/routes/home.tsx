import type { Route } from './+types/home';
import CharacterDetail from '../components/characters/characterDetail';
import { SKILL_DEFINITIONS } from 'core/models/molecules/skills/skill.definitions';
import { createSkill } from 'core/models/molecules/skills/skill.factory';
import { Character } from 'core/models/organisms/character/types';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const MockCharacter: Character = {
    id: '1243',
    name: 'William',
    playerName: 'Pierre-Olivier',
    level: 1,
    skillDefinitions: SKILL_DEFINITIONS,
    skills: SKILL_DEFINITIONS.map((def) => {
      return createSkill(def);
    }),
    attributes: {
      strength: 10,
      constitution: 10,
      dexterity: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    armor: {
      type: 'light',
    },
  };

  return <CharacterDetail character={MockCharacter} />;
}
