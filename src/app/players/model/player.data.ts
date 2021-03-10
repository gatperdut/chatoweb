import { Credentials } from "src/app/authentication/types/credentials.type";

export interface PlayerData {

  readonly id: number;

  readonly email: string;

  readonly nickname: string;

  readonly role: string;

  readonly image: string;

  readonly created_at: Date;

  readonly access_locked: boolean;

  readonly confirmed: boolean;

  readonly credentials: Credentials;

  readonly current_character: any;

}
