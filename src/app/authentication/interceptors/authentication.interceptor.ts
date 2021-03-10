import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HttpResponseBase } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { exhaustMap, take, tap } from "rxjs/operators";
import { Player } from "src/app/players/model/player.model";
import * as _ from "underscore";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  public intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    return this.authenticationService.playerSubject
    .pipe(
      take(1),
      exhaustMap(
        (player: Player): Observable<HttpEvent<any>> => {
          let _httpRequest: HttpRequest<any>;

          if (!player) {
            _httpRequest = httpRequest

          }
          else {
            const httpHeaders: HttpHeaders = this.authenticationService.requestHeaders();

            _httpRequest = httpRequest.clone(
              {
                headers: httpHeaders
              }
            );
          }

          return httpHandler.handle(_httpRequest)
          .pipe(
            tap(
              (): void => {

              },
              (error: HttpResponseBase): void => {
                if (error instanceof HttpErrorResponse) {
                  if (_.include([401, 403], error.status)) {
                    this.router.navigate(['/']);
                  }
                }
              }
            )
          );
        }
      )
    );
  }

}
