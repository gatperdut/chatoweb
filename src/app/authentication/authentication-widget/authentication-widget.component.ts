import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/players/model/player.model';
import { AuthenticationErrorService } from '../services/authentication-error.service';
import { AuthenticationService } from '../services/authentication.service';
import { clearFormState } from '../state/authentication-form.state';
import { AuthenticationPasswordReset } from '../types/authentication-password-reset.type';
import { AuthenticationSignin } from '../types/authentication-signin.type';
import { AuthenticationSignout } from '../types/authentication-signout.type';
import { AuthenticationSignup } from '../types/authentication-signup.type';
import { AuthenticationWidgetState, Mode } from './state/authentication-widget.state';

@Component({
  selector: 'cw-authentication-widget',
  templateUrl: './authentication-widget.component.html',
  styleUrls: ['./authentication-widget.component.scss']
})
export class AuthenticationWidgetComponent implements OnInit, OnDestroy {

  @ViewChild('signupPopover') signupPopover: NgbPopover;
  @ViewChild('signinPopover') signinPopover: NgbPopover;
  @ViewChild('passwordResetPopover') passwordResetPopover: NgbPopover;
  @ViewChild('authenticatedPopover') authenticatedPopover: NgbPopover;

  public state: AuthenticationWidgetState = new AuthenticationWidgetState();

  public Mode = Mode;

  public playerSubscription: Subscription;

  public player: Player = null;

  constructor(
    private authenticationService: AuthenticationService,
    private authenticationErrorService: AuthenticationErrorService
  ) {

  }

  ngOnInit(): void {
    this.playerSubscription = this.authenticationService.playerSubject.subscribe(
      (player: Player): void => {
        this.player = player;

        if (player) {
          this.player = player;
          this.switchMode(Mode.Authenticated, false);
        }
        else {
          if (!this.state.mode.is.signin()) {
            this.switchMode(Mode.Signin, false);
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.playerSubscription.unsubscribe();
  }

  public switchMode(mode: Mode, open: boolean): void {
    clearFormState(this.state.signin);
    clearFormState(this.state.signup);
    clearFormState(this.state.passwordReset);
    clearFormState(this.state.signout);

    if (this.signinPopover) {
      this.signinPopover.close();
    }
    if (this.signupPopover) {
      this.signupPopover.close();
    }
    if (this.passwordResetPopover) {
      this.passwordResetPopover.close();
    }
    if (this.authenticatedPopover) {
      this.authenticatedPopover.close();
    }

    setTimeout(
      (): void => {
        this.state.mode.set(mode);

        if (!open) {
          return;
        }

        switch(mode) {
          case Mode.Signin:
            this.signinPopover.open();
            break;
          case Mode.Signup:
            this.signupPopover.open();
            break;
          case Mode.PasswordReset:
            this.passwordResetPopover.open();
            break;
          case Mode.Authenticated:
            this.authenticatedPopover.open();
            break;
        }
      },
      200
    );
  };

  public onSignin(signinForm: NgForm): void {
    clearFormState(this.state.signin);
    this.state.signin.loading = true;

    this.authenticationService.signin(
      signinForm.form.value.email,
      signinForm.form.value.password
    )
    .subscribe(
      (player: Player): void => {
        clearFormState(this.state.signin);
        signinForm.reset();
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        this.state.signin.errors = this.authenticationErrorService.errorMessage(httpErrorResponse);
        this.state.signin.loading = false;
      }
    );
  }

  public onSignup(signupForm: NgForm): void {
    clearFormState(this.state.signup);
    this.state.signup.loading = true;

    this.authenticationService.signup(
      signupForm.form.value.email,
      signupForm.form.value.nickname,
      signupForm.form.value.password,
      signupForm.form.value.passwordConfirmation
    )
    .subscribe(
      (authenticationSignup: AuthenticationSignup): void => {
        this.state.signup.loading = false;
        this.state.signup.success = true;
        signupForm.reset();
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        this.state.signup.errors = this.authenticationErrorService.errorMessage(httpErrorResponse);;
        this.state.signup.loading = false;
      }
    );
  }

  public onPasswordResetRequest(passwordResetForm: NgForm): void {
    clearFormState(this.state.passwordReset);
    this.state.passwordReset.loading = true;

    this.authenticationService.passwordResetRequest(
      passwordResetForm.form.value.email
    )
    .subscribe(
      (authenticationPasswordReset: AuthenticationPasswordReset): void => {
        this.state.passwordReset.loading = false;
        this.state.passwordReset.success = true;
        passwordResetForm.reset();
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        this.state.passwordReset.errors = this.authenticationErrorService.errorMessage(httpErrorResponse);;
        this.state.passwordReset.loading = false;
      }
    );
  }

  onSignout(): void {
    clearFormState(this.state.signout);
    this.state.signout.loading = true;

    this.authenticationService.signout()
    .subscribe(
      (response: AuthenticationSignout): void => {
        this.state.signout.loading = false;
        this.state.signout.success = true;
        this.switchMode(Mode.Signin, false);
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        this.state.signout.errors = this.authenticationErrorService.errorMessage(httpErrorResponse);;
        this.state.signout.loading = false;
      }
    )
  }

}
