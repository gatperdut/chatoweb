import { Credentials } from "src/app/authentication/types/credentials.type";
import { PlayerData } from "./player-data.interface";

export class Player implements PlayerData {

  public credentials: Credentials;

  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly nickname: string,
    public readonly role: string,
    public readonly image: string,
    public readonly created_at: Date,
    public readonly access_locked: boolean,
    public readonly confirmed: boolean,
    credentialsToken: string,
    credentialsClient: string
  ) {
    if (credentialsToken && credentialsClient) {
      this.credentials = {
        token: credentialsToken,
        client: credentialsClient
      };
    }
    else {
      this.credentials = null;
    }
  }

  public roleIs = {
    regular: (): boolean => this.role === 'regular',
    admin:   (): boolean => this.role === 'admin',
    owner:   (): boolean => this.role === 'owner'
  };

}
