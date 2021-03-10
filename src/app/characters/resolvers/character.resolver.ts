import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as _ from "underscore";
import { Character } from "../models/character.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterResolver implements Resolve<Character> {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): (Observable<Character> | Character) {
    const id:number = parseInt(activatedRouteSnapshot.params['id']);

    if (_.isNaN(id)) {
      return throwError('Invalid character id');
    }

    return this.httpClient.get<Character>(
      environment.cmBaseUrl + '/characters/' + id
    )
    .pipe(
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<Character> => {
          this.router.navigate(['/']);
          return throwError(httpErrorResponse);
        }
      )
    );
  }

}
