import { AttributeSetData } from "./attribute-set.data";
import { SkillSet } from "./skill-set.model";

export interface CharacterData {

  readonly id: number;

  readonly player_id: number;

  name: string;

  image: string;

  short_desc: string;

  long_desc: string;

  full_desc: string;

  kwords: string[];

  room_id: number;

  npc: boolean;

  gladiator: boolean;

  active: boolean;

  created_at: Date;

  attribute_set: AttributeSetData;

  skill_set: SkillSet;

}
