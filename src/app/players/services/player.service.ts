import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { PlayerData } from "../model/player.data";
import { Player } from "../model/player.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
  ) {

  }

  public craftPlayer(playerData: PlayerData): Player {
    return new Player(
      playerData.id,
      playerData.email,
      playerData.action_cable_uid,
      playerData.nickname,
      playerData.role,
      playerData.image,
      playerData.created_at,
      playerData.access_locked,
      playerData.confirmed,
      playerData.current_character,
      null,
      null
    );
  }

  public craftPlayers(playersData: PlayerData[]): Player[] {
    return _.map(
      playersData,
      this.craftPlayer.bind(this)
    );
  }

}
