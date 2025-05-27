import { ARMOR_STR_REQUIREMENTS } from "./armor.data";
import { ArmorType } from "./armor.type";

export function getArmorSpeedPenalty(type: ArmorType, strength: number): 0 | -10 {
    return ARMOR_STR_REQUIREMENTS[type] <= strength ? 0 : -10;
}

export function getArmorPenalty(type: ArmorType, strength: number): 0 | -1 {
    return ARMOR_STR_REQUIREMENTS[type] <= strength ? 0 : -1;
}