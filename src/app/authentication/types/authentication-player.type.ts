export type AuthenticationPlayer = {

  readonly id: number;

  readonly email: string;

  readonly nickname: string;

  readonly image: string;

  readonly role: string;

  readonly current_character: CharacterData;

  readonly confirmed: boolean;

  readonly access_locked: boolean;

  readonly created_at: string;

}
