import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { SnackBarService } from "src/app/snack-bar/services/snack-bar.service";
import { environment } from "src/environments/environment";
import * as _ from "underscore";
import { DoorData } from "../models/door.data";
import { Door } from "../models/door.model";
import { DoorService } from "./door.service";

@Injectable({
  providedIn: 'root'
})
export class DoorActionsService {

  constructor(
    private httpClient: HttpClient,
    private doorService: DoorService,
    private snackBarService: SnackBarService
  ) {

  }

  public index(): Observable<Door[]> {
    return this.httpClient.get<DoorData[]>(
      environment.cmBaseUrl + '/doors'
    )
    .pipe(
      map(
        this.doorService.craftDoors.bind(this.doorService)
      )
    );
  }

  public create(doorData: DoorData): Observable<DoorData> {
    return this.httpClient.post<DoorData>(
      environment.cmBaseUrl + '/doors',
      {
        door: doorData
      }
    )
    .pipe(
      tap(
        (doorData: DoorData): void => {
          this.snackBarService.ok('Door #' + doorData.id + ' created.');
        }
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<DoorData> => {
          this.snackBarService.bad('Could not create door.', httpErrorResponse.error.errors);
          return throwError(httpErrorResponse.error);
        }
      )
    )
  }

  public update(doorData: DoorData): Observable<DoorData> {
    return this.httpClient.put<DoorData>(
      environment.cmBaseUrl + '/doors/' + doorData.id,
      {
        door: doorData
      }
    )
    .pipe(
      tap(
        (doorData: DoorData): void => {
          this.snackBarService.ok('Door #' + doorData.id + ' updated.')
        }
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<DoorData> => {
          this.snackBarService.bad('Could not update door', httpErrorResponse.error.errors);
          return throwError(httpErrorResponse.error);
        }
      )
    );
  }

}
