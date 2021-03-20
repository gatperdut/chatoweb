import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { RoomService } from "../services/room.service";
import { Room } from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomsResolver implements Resolve<Room[]> {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private roomService: RoomService
  ) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): (Observable<Room[]> | Room[]) {
    return this.httpClient.get<Room[]>(
      environment.cmBaseUrl + '/rooms'
    )
    .pipe(
      map(
        this.roomService.craftRooms.bind(this.roomService),
        (httpErrorResponse: HttpErrorResponse): Observable<Room[]> => {
          this.router.navigate(['/']);
          return throwError(httpErrorResponse);
        }
      )
    );
  }

}
