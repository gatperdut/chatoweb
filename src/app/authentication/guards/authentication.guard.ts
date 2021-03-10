import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Player } from "src/app/players/model/player.model";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): (boolean | UrlTree | Observable<boolean | UrlTree>) {
    if (this.authenticationService.isLoggedIn) {
      return of(true);
    }

    return this.authenticationService.automaticSignin()
    .pipe(
      map(
        (player: Player): (boolean | UrlTree) => {
          return !!player;
        }
      )
    );
  }

}
