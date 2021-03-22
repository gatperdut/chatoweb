import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { RoomData } from "../models/room.data";
import { Room } from "../models/room.model";
import { RoomService } from "./room.service";

@Injectable({
  providedIn: 'root'
})
export class RoomActionsService {

  constructor(
    private httpClient: HttpClient,
    private roomService: RoomService
  ) {

  }

  public index(): Observable<Room[]> {
    return this.httpClient.get<RoomData[]>(
      environment.cmBaseUrl + '/rooms'
    )
    .pipe(
      map(
        this.roomService.craftRooms.bind(this.roomService)
      )
    );
  }

  public create(room: Room): Observable<RoomData> {
    return this.httpClient.post<RoomData>(
      environment.cmBaseUrl + '/rooms',
      {
        room: room
      }
    );
  }

  public update(room: Room): Observable<RoomData> {
    return this.httpClient.put<RoomData>(
      environment.cmBaseUrl + '/rooms/' + room.id,
      {
        room: room
      }
    );
  }

}
