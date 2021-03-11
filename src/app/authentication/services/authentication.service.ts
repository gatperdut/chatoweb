import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AsyncSubject, BehaviorSubject, Observable, of } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { Player } from "src/app/players/model/player.model";
import { environment } from "src/environments/environment";
import { AuthenticationStorage } from "../types/authentication-storage.type";
import { Router } from "@angular/router";
import { AuthenticationPlayer } from "../types/authentication-player.type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public player: Player = null;

  public readonly playerAutomaticSubject: AsyncSubject<Player> =new AsyncSubject();

  public readonly playerSubject: BehaviorSubject<Player> = new BehaviorSubject<Player>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

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
    authenticationSigninResponse: AuthenticationPlayer,
    credentialsToken: string,
    credentialsClient: string
    ): Player {
      return new Player(
        authenticationSigninResponse.id,
        authenticationSigninResponse.email,
        authenticationSigninResponse.nickname,
        authenticationSigninResponse.role,
        authenticationSigninResponse.image,
        new Date(authenticationSigninResponse.created_at),
        authenticationSigninResponse.access_locked,
        authenticationSigninResponse.confirmed,
        null,
        credentialsToken,
        credentialsClient,
      );
  }

  private validateToken(email: string, credentialsClient: string, credentialsToken: string): Observable<AuthenticationPlayer> {
    return this.httpClient.get<AuthenticationPlayer>(
      environment.cmBaseUrl + '/authentication/validate_token?uid=' + email + '&access-token=' + encodeURIComponent(credentialsToken) + '&client=' + encodeURIComponent(credentialsClient)
    );
  }

  public automaticSignin(): Observable<Player> {
    const authenticationStorageRaw: string = localStorage.getItem('player');

    if (!authenticationStorageRaw) {
      this.playerAutomaticSubject.next(null);
      this.playerAutomaticSubject.complete();
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
        (authenticationPlayer: AuthenticationPlayer): Player => {
          const player: Player = this.craftPlayer(authenticationPlayer, authenticationStorage.credentialsToken, authenticationStorage.credentialsClient);
          this.handleAuthentication(player);
          this.playerAutomaticSubject.next(player);
          this.playerAutomaticSubject.complete();
          return player;
        },
        (httpErrorResponse: HttpErrorResponse): Observable<Player> => {
          localStorage.removeItem('player');
          this.router.navigate(['/']);
          this.playerAutomaticSubject.next(null);
          this.playerAutomaticSubject.complete();
          return of(null);
        }
      )
    )
  };

  public signin(email: string, password: string): Observable<Player> {
    return this.httpClient.post<AuthenticationPlayer>(
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
        (authenticationPlayerHttpResponse: HttpResponse<AuthenticationPlayer>): Player => {
          return this.craftPlayer(
            authenticationPlayerHttpResponse.body,
            authenticationPlayerHttpResponse.headers.get('access-token'),
            authenticationPlayerHttpResponse.headers.get('client')
          );
        }
      ),
      tap(this.handleAuthentication.bind(this))
    );
  }

  public signup(email: string, nickname: string, password: string, password_confirmation: string): Observable<void> {
    return this.httpClient.post<void>(
      environment.cmBaseUrl + '/authentication',
      {
        email: email,
        nickname: nickname,
        password: password,
        password_confirmation: password_confirmation
      }
    );
  }

  public passwordResetRequest(email: string): Observable<void> {
    return this.httpClient.post<void>(
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

  public signout(): Observable<void> {
    return this.httpClient.delete<void>(
      environment.cmBaseUrl + '/authentication/sign_out'
    )
    .pipe(
      tap(
        (): void => {
          this.router.navigate(['/']);
          localStorage.removeItem('player');
          window.location.reload();
        }
      )
    );
  }

}
