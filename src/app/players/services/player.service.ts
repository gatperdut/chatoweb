import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as _ from "underscore";
import { PlayerData } from "../model/player-data.interface";
import { Player } from "../model/player.model";
import { PlayerQuery } from "../types/player-query.type";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  private craftPlayers(playersData: PlayerData[]): Player[] {
    return _.map(
      playersData,
      (playerData: PlayerData) => {
        return new Player(
          playerData.id,
          playerData.email,
          playerData.nickname,
          playerData.role,
          playerData.image,
          playerData.created_at,
          playerData.access_locked,
          playerData.confirmed,
          null,
          null
        );
      }
    );
  }

  public index(): Observable<Player[]> {
    return this.httpClient.get<PlayerData[]>(
      environment.cmBaseUrl + '/players'
    )
    .pipe(
      map(this.craftPlayers)
    );
  }

  public query(playerQuery: PlayerQuery): Observable<Player[]> {
    return this.httpClient.get<PlayerData[]>(
      environment.cmBaseUrl + '/players/query?nickname=' + playerQuery.nickname
    )
    .pipe(
      map(this.craftPlayers)
    )
  }

  public show(id: number): Observable<PlayerData> {
    return this.httpClient.get<PlayerData>(
      environment.cmBaseUrl + '/players/' + id
    );
  }

}
