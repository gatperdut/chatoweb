import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as _ from "underscore";
import { PlayerData } from "../model/player.data";
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
          playerData.current_character,
          null,
          null
        );
      }
    );
  }

  public index(playerQuery: PlayerQuery): Observable<Player[]> {
    let httpParams = new HttpParams();

    if (playerQuery.term) {
      httpParams = httpParams.append('term', playerQuery.term)
    }

    _.each(
      playerQuery.roles,
      (role: string) => {
        httpParams = httpParams.append('roles[]', role);
      }
    );

    if (playerQuery.status) {
      httpParams = httpParams.append('status', playerQuery.status)
    }

    return this.httpClient.get<PlayerData[]>(
      environment.cmBaseUrl + '/players',
      {
        params: httpParams
      }
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
