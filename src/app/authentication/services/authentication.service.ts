import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { Player } from "src/app/players/model/player.model";
import { environment } from "src/environments/environment";
import { AuthenticationSignin } from "../types/authentication-signin.type";
import { AuthenticationStorage } from "../types/authentication-storage.type";
import { Router } from "@angular/router";
import { AuthenticationSignup } from "../types/authentication-signup.type";
import { AuthenticationPasswordReset } from "../types/authentication-password-reset.type";
import { AuthenticationSignout } from "../types/authentication-signout.type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public player: Player = null;

  public readonly playerSubject: BehaviorSubject<Player> = new BehaviorSubject<Player>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  public get isLoggedIn(): boolean {
    return !!this.player;
  }

  public requestHeaders(): HttpHeaders {
    return new HttpHeaders(
      {
        'uid': this.player.email,
        'client': this.player.credentials.client,
        'access-token': this.player.credentials.token
      }
    );
  }

  private handleAuthentication(player: Player): void {
    this.player = player;

    this.playerSubject.next(player);

    const authenticationStorage: AuthenticationStorage = {
      email: player.email,
      credentialsToken: player.credentials.token,
      credentialsClient: player.credentials.client
    };

    localStorage.setItem(
      'player',
      JSON.stringify(authenticationStorage)
    );
  }

  private craftPlayer(
    authenticationSigninResponse: AuthenticationSignin,
    credentialsToken: string,
    credentialsClient: string
    ): Player {
      return new Player(
        authenticationSigninResponse.data.id,
        authenticationSigninResponse.data.email,
        authenticationSigninResponse.data.nickname,
        authenticationSigninResponse.data.role,
        authenticationSigninResponse.data.image,
        new Date(authenticationSigninResponse.data.created_at),
        authenticationSigninResponse.data.access_locked,
        authenticationSigninResponse.data.confirmed,
        null,
        credentialsToken,
        credentialsClient,
      );
  }

  private validateToken(email: string, credentialsClient: string, credentialsToken: string): Observable<AuthenticationSignin> {
    return this.httpClient.get<AuthenticationSignin>(
      environment.cmBaseUrl + '/authentication/validate_token?uid=' + email + '&access-token=' + encodeURIComponent(credentialsToken) + '&client=' + encodeURIComponent(credentialsClient)
    );
  }

  public automaticSignin(): Observable<Player> {
    const authenticationStorageRaw: string = localStorage.getItem('player');

    if (!authenticationStorageRaw) {
      return of(null);
    }

    const authenticationStorage: AuthenticationStorage = JSON.parse(authenticationStorageRaw);

    return this.validateToken(
      authenticationStorage.email,
      authenticationStorage.credentialsClient,
      authenticationStorage.credentialsToken
    )
    .pipe(
      map(
        (authenticationSigninResponse: AuthenticationSignin): Player => {
          const player: Player = this.craftPlayer(authenticationSigninResponse, authenticationStorage.credentialsToken, authenticationStorage.credentialsClient);
          this.handleAuthentication(player);
          return player;
        },
        (httpErrorResponse: HttpErrorResponse): Observable<Player> => {
          localStorage.removeItem('player');
          this.router.navigate(['/']);
          return of(null);
        }
      )
    )
  };

  public signin(email: string, password: string): Observable<Player> {
    return this.httpClient.post<AuthenticationSignin>(
      environment.cmBaseUrl + '/authentication/sign_in',
      {
        email: email,
        password: password
      },
      {
        observe: 'response'
      }
    )
    .pipe(
      map(
        (httpResponse: HttpResponse<AuthenticationSignin>): Player => {
          return this.craftPlayer(
            httpResponse.body,
            httpResponse.headers.get('access-token'),
            httpResponse.headers.get('client')
          );
        }
      ),
      tap(this.handleAuthentication.bind(this))
    );
  }

  public signup(email: string, nickname: string, password: string, password_confirmation: string): Observable<AuthenticationSignup> {
    return this.httpClient.post<AuthenticationSignup>(
      environment.cmBaseUrl + '/authentication',
      {
        email: email,
        nickname: nickname,
        password: password,
        password_confirmation: password_confirmation
      }
    );
  }

  public passwordResetRequest(email: string): Observable<AuthenticationPasswordReset> {
    return this.httpClient.post<AuthenticationPasswordReset>(
      environment.cmBaseUrl + '/authentication/password',
      {
        email: email
      }
    );
  }

  public passwordResetUpdate(password: string, passwordConfirmation: string, resetPasswordToken: string): Observable<any> {
    return this.httpClient.put<any>(
      environment.cmBaseUrl + '/authentication/password',
      {
        password: password,
        password_confirmation: passwordConfirmation,
        reset_password_token: resetPasswordToken
      }
    );
  }

  public signout(): Observable<AuthenticationSignout> {
    return this.httpClient.delete<AuthenticationSignout>(
      environment.cmBaseUrl + '/authentication/sign_out'
    )
    .pipe(
      tap(
        (authenticationSignoutResponse: AuthenticationSignout): void => {
          this.router.navigate(['/'])
          .then(
            (): void => {
              localStorage.removeItem('player');
              window.location.reload();
            }
          );
        }
      )
    );
  }

}
