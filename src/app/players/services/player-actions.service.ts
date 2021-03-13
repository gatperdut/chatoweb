import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as _ from "underscore";
import { PlayerData } from "../model/player.data";
import { Player } from "../model/player.model";
import { PlayerQuery } from "../types/player-query.type";
import { PlayerService } from "./player.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerActionsService {

  constructor(
    private httpClient: HttpClient,
    private playerService: PlayerService
  ) {

  }

  public index(playerQuery: PlayerQuery): Observable<Player[]> {
    let httpParams = new HttpParams();

    if (playerQuery.term) {
      httpParams = httpParams.append('term', playerQuery.term)
    }

    _.each(
      playerQuery.roles,
      (role: string): void => {
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
      map(
        this.playerService.craftPlayers.bind(this.playerService)
      )
    )
  }

  public show(id: number): Observable<Player> {
    return this.httpClient.get<PlayerData>(
      environment.cmBaseUrl + '/players/' + id
    )
    .pipe(
      map(
        this.playerService.craftPlayer
      )
    );
  }

}
