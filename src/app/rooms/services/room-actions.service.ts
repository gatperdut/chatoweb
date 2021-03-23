import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { SnackBarService } from "src/app/snack-bar/services/snack-bar.service";
import { environment } from "src/environments/environment";
import * as _ from "underscore";
import { RoomData } from "../models/room.data";
import { Room } from "../models/room.model";
import { RoomService } from "./room.service";

@Injectable({
  providedIn: 'root'
})
export class RoomActionsService {

  constructor(
    private httpClient: HttpClient,
    private roomService: RoomService,
    private snackBarService: SnackBarService
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

  public create(roomData: RoomData): Observable<RoomData> {
    return this.httpClient.post<RoomData>(
      environment.cmBaseUrl + '/rooms',
      {
        room: roomData
      }
    )
    .pipe(
      tap(
        (roomData: RoomData): void => {
          this.snackBarService.ok('Room #' + roomData.id + ' created.');
        }
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<RoomData> => {
          this.snackBarService.bad('Could not create room.', httpErrorResponse.error.errors);
          return throwError(httpErrorResponse.error);
        }
      )
    )
  }

  private stringifyError(errors: { [key: string]: string }): string {
    return _.map(
      _.keys(errors),
      (key: string): string => {
        return `${key}: ${errors[key]}`
      }
    ).join('')
  }

  public update(roomData: RoomData): Observable<RoomData> {
    return this.httpClient.put<RoomData>(
      environment.cmBaseUrl + '/rooms/' + roomData.id,
      {
        room: roomData
      }
    )
    .pipe(
      tap(
        (roomData: RoomData): void => {
          this.snackBarService.ok('Room #' + roomData.id + ' updated.')
        }
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<RoomData> => {
          this.snackBarService.bad('Could not update room', httpErrorResponse.error.errors);
          return throwError(httpErrorResponse.error);
        }
      )
    );
  }

}
