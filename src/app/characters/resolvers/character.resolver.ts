import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as _ from "underscore";
import { Character } from "../models/character.model";
import { CharacterData } from '../models/character.data';

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

    return this.httpClient.get<CharacterData>(
      environment.cmBaseUrl + '/characters/' + id
    )
    .pipe(
      map(
        (characterData: CharacterData): Character => {
          return new Character(
            characterData.id,
            characterData.name,
            characterData.image,
            characterData.short_desc,
            characterData.long_desc,
            characterData.full_desc,
            characterData.kwords,
            characterData.player_id,
            characterData.room_id,
            characterData.npc,
            characterData.gladiator,
            characterData.active,
            characterData.created_at
          );
        },
        (httpErrorResponse: HttpErrorResponse): Observable<Character> => {
          this.router.navigate(['/']);
          return throwError(httpErrorResponse);
        }
      )
    );
  }

}
