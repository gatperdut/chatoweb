import { Credentials } from "src/app/authentication/types/credentials.type";

export interface PlayerData {

  readonly id: number;

  email: string;

  nickname: string;

  role: string;

  image: string;

  created_at: Date;

  readonly access_locked: boolean;

  readonly confirmed: boolean;

  credentials: Credentials;

  current_character: any;

}
