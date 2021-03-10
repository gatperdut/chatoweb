import { CharacterData } from './character.data'

export class Character implements CharacterData {

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly image: string,
    public readonly short_desc: string,
    public readonly long_desc: string,
    public readonly full_desc: string,
    public readonly kwords: string[],
    public readonly player_id: number,
    public readonly room_id: number,
    public readonly npc: boolean,
    public readonly gladiator: boolean,
    public readonly active: boolean,
    public readonly created_at: Date
  ) {

  }

}
