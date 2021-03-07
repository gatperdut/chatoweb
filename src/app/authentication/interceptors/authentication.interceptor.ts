import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { Player } from "src/app/players/model/player.model";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {

  }

  public intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    return this.authenticationService.playerSigninSubject
    .pipe(
      take(1),
      exhaustMap(
        (player: Player): Observable<HttpEvent<any>> => {
          if (!player) {
            return httpHandler.handle(httpRequest);
          }

          const httpHeaders: HttpHeaders = this.authenticationService.requestHeaders();

          const _httpRequest = httpRequest.clone(
            {
              headers: httpHeaders
            }
          );

          return httpHandler.handle(_httpRequest);
        }
      )
    );
  }

}
