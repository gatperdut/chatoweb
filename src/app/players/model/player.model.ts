import { Credentials } from "src/app/authentication/types/credentials.type";
import { PlayerData } from "./player.data";

export class Player implements PlayerData {

  public credentials: Credentials;

  constructor(
    public readonly id: number,
    public email: string,
    public nickname: string,
    public role: string,
    public image: string,
    public created_at: Date,
    public readonly access_locked: boolean,
    public readonly confirmed: boolean,
    public current_character: any,
    credentialsToken: string,
    credentialsClient: string,
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
