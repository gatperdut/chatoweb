import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { combineLatest, Observable, of, pipe, Subscriber } from "rxjs";
import { concatMap, first, map, mergeMap, switchMap, take, tap, withLatestFrom } from "rxjs/operators";
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
      return true;
    }

    return new Observable<boolean | UrlTree>(
      (observer: Subscriber<boolean | UrlTree>) => {
        this.authenticationService.playerAutomaticSigninSubject.subscribe(
          (player: Player): (boolean | UrlTree) => {
            if (player) {
              observer.next(true);
              return true;
            }

            observer.next(false);
            return this.router.createUrlTree(['/']);
          }
        )
      }
    )
  }

}
