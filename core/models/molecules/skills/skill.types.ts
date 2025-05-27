import { Attribute } from "../../atoms/attributes/types"
import { Proficiency } from "../../atoms/proficiency/type"

export interface Skill {
  name: string
  proficiency: Proficiency
  item: number
}

export interface SkillDefinition {
  name: string;
  attribute: Attribute;
}
