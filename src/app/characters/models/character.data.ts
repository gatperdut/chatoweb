export interface CharacterData {

  readonly id: number;

  name: string;

  image: string;

  short_desc: string;

  long_desc: string;

  full_desc: string;

  kwords: string[];

  player_id: number;

  room_id: number;

  npc: boolean;

  gladiator: boolean;

  active: boolean;

  created_at: Date;

}
