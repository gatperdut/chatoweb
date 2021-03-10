import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Player } from "src/app/players/model/player.model";
import * as _ from "underscore";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationResolver implements Resolve<Player> {

  constructor(
    private authenticationService: AuthenticationService
  ) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): (Observable<Player> | Player) {
    return of(this.authenticationService.player);
  }

}
