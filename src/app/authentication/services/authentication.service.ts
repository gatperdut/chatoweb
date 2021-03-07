import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AsyncSubject, BehaviorSubject, Observable, Subject } from "rxjs";
import { first, map, tap } from 'rxjs/operators';
import { PlayerData } from "src/app/players/model/player-data.interface";
import { Player } from "src/app/players/model/player.model";
import { environment } from "src/environments/environment";
import { AuthenticationSigninResponse } from "../types/authentication-signin-response.type";
import { AuthenticationStorage } from "../types/authentication-storage.type";
import { Router } from "@angular/router";
import { AuthenticationSignoutResponse } from "../types/authentication-signout-response.type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private player: Player = null;

  public readonly playerAutomaticSigninSubject: AsyncSubject<Player> = new AsyncSubject<Player>();

  public readonly playerSigninSubject: BehaviorSubject<Player> = new BehaviorSubject<Player>(null);

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

  public handleAuthentication(player: Player): void {
    this.player = player;

    this.playerSigninSubject.next(player);

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

  public craftPlayer(
    authenticationSigninResponse: AuthenticationSigninResponse,
    credentialsToken: string,
    credentialsClient: string
    ): Player {
      return new Player(
        authenticationSigninResponse.data.id,
        authenticationSigninResponse.data.email,
        authenticationSigninResponse.data.nickname,
        authenticationSigninResponse.data.image,
        credentialsToken,
        credentialsClient,
      );
  }

  public automaticSignin(): void {
    const authenticationStorageRaw: string = localStorage.getItem('player');

    if (!authenticationStorageRaw) {
      this.playerAutomaticSigninSubject.next(null);
      this.playerAutomaticSigninSubject.complete();
      return;
    }

    const authenticationStorage: AuthenticationStorage = JSON.parse(authenticationStorageRaw);

    this.validateToken(
      authenticationStorage.email,
      authenticationStorage.credentialsClient,
      authenticationStorage.credentialsToken
    )
    .subscribe(
      (authenticationSigninResponse: AuthenticationSigninResponse) => {
        const player: Player = this.craftPlayer(authenticationSigninResponse, authenticationStorage.credentialsToken, authenticationStorage.credentialsClient);
        this.playerAutomaticSigninSubject.next(player);
        this.playerAutomaticSigninSubject.complete();
        this.handleAuthentication(player);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        this.playerAutomaticSigninSubject.next(null);
        this.playerAutomaticSigninSubject.complete();
        localStorage.removeItem('player');
        this.router.navigate(['/']);
      }
    );
  };

  public validateToken(email: string, credentialsClient: string, credentialsToken: string): Observable<AuthenticationSigninResponse> {
    return this.httpClient.get<AuthenticationSigninResponse>(
      environment.cmBaseUrl + '/authentication/validate_token?uid=' + email + '&access-token=' + encodeURIComponent(credentialsToken) + '&client=' + encodeURIComponent(credentialsClient)
    );
  }

  public signin(email: string, password: string): Observable<PlayerData> {
    return this.httpClient.post<AuthenticationSigninResponse>(
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
        (httpResponse: HttpResponse<AuthenticationSigninResponse>): Player => {
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

  public signup(email: string, nickname: string, password: string, password_confirmation: string): Observable<any> {
    return this.httpClient.post<any>(
      environment.cmBaseUrl + '/authentication',
      {
        email: email,
        nickname: nickname,
        password: password,
        password_confirmation: password_confirmation
      }
    )
  }

  public passwordResetRequest(email: string): Observable<any> {
    return this.httpClient.post<any>(
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

  public signout(): Observable<AuthenticationSignoutResponse> {
    return this.httpClient.delete<AuthenticationSignoutResponse>(
      environment.cmBaseUrl + '/authentication/sign_out'
    )
    .pipe(
      tap(
        (authenticationSignoutResponse: AuthenticationSignoutResponse) => {
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
