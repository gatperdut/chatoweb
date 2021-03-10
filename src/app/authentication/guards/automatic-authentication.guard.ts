import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { Player } from "src/app/players/model/player.model";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AutomaticAuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): (boolean | UrlTree | Observable<boolean | UrlTree>) {
    return this.authenticationService.playerAutomaticSubject
    .pipe(
      first(),
      map(
        (player: Player): (boolean | UrlTree) => {
          if (player) {
            return true;
          }

          return this.router.createUrlTree(['/']);
        }
      )
    );
  }

}
