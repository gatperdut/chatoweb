export interface CharacterData {

  readonly id: number;

  readonly name: string;

  readonly image: string;

  readonly short_desc: string;

  readonly long_desc: string;

  readonly full_desc: string;

  readonly kwords: string[];

  readonly player_id: number;

  readonly room_id: number;

  readonly npc: boolean;

  readonly gladiator: boolean;

  readonly active: boolean;

  readonly created_at: Date;

}
