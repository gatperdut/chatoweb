import { Credentials } from "src/app/authentication/types/credentials.type";
import { PlayerData } from "./player-data.interface";

export class Player implements PlayerData {

  public credentials: Credentials;

  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly nickname: string,
    public readonly image: string,
    credentialsToken: string,
    credentialsClient: string
  ) {
    this.credentials = {
      token: credentialsToken,
      client: credentialsClient
    };
  }

}
