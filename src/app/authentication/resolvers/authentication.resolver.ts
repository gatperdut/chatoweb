import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Player } from "src/app/players/model/player.model";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationResolver implements Resolve<Player> {

  constructor(
    private authenticationService: AuthenticationService
  ) {

  }

  public resolve(): (Promise<Player> | Observable<Player> | Player) {
    return this.authenticationService.playerSigninSubject
    .pipe(
      first()
    );
  }

}
