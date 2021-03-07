import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PlayerData } from "../model/player-data.interface";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  public index(): Observable<PlayerData[]> {
    return this.httpClient.get<PlayerData[]>(
      environment.cmBaseUrl + '/players'
    );
  }

  public show(id: number): Observable<PlayerData> {
    return this.httpClient.get<PlayerData>(
      environment.cmBaseUrl + '/players/' + id
    );
  }

}
