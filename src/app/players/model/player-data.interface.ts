import { Credentials } from "src/app/authentication/types/credentials.type";

export interface PlayerData {

  readonly id: number,

  readonly email: string,

  readonly nickname: string,

  readonly image: string

  readonly credentials: Credentials

}
