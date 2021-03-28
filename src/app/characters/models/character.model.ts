import { AttributeSet } from './attribute-set.model';
import { CharacterData } from './character.data'
import { SkillSet } from './skill-set.model';

export class Character implements CharacterData {

  constructor(
    public readonly id: number,
    public readonly player_id: number,
    public name: string,
    public image: string,
    public short_desc: string,
    public long_desc: string,
    public full_desc: string,
    public kwords: string[],
    public room_id: number,
    public npc: boolean,
    public gladiator: boolean,
    public active: boolean,
    public created_at: Date,
    public attribute_set: AttributeSet,
    public skill_set: SkillSet
  ) {

  }

}
