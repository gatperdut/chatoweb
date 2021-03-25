import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Door } from "../models/door.model";
import { DoorService } from "../services/door.service";

@Injectable({
  providedIn: 'root'
})
export class DoorsResolver implements Resolve<Door[]> {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private doorService: DoorService
  ) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): (Observable<Door[]> | Door[]) {
    return this.httpClient.get<Door[]>(
      environment.cmBaseUrl + '/doors'
    )
    .pipe(
      map(
        this.doorService.craftDoors.bind(this.doorService),
        (httpErrorResponse: HttpErrorResponse): Observable<Door[]> => {
          this.router.navigate(['/']);
          return throwError(httpErrorResponse);
        }
      )
    );
  }

}
