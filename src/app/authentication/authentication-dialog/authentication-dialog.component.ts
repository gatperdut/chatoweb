import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationDialogState, Mode } from './state/authentication-dialog.state';
import { AuthenticationErrorService } from '../services/authentication-error.service';
import { clearFormState } from '../state/authentication-form.state';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'
import { AuthenticationService } from '../services/authentication.service';
import { Player } from 'src/app/players/model/player.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GlobalErrorStateMatcher } from 'src/app/shared/forms/global.error-state-matcher';
import { Router } from '@angular/router';

@Component({
  selector: 'cw-authentication-dialog',
  templateUrl: './authentication-dialog.component.html',
  styleUrls: ['./authentication-dialog.component.scss']
})
export class AuthenticationDialogComponent implements OnInit, OnDestroy {

  public state: AuthenticationDialogState = new AuthenticationDialogState();

  public Mode = Mode;

  public loading: boolean = false;

  public player: Player;

  public playerSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private authenticationErrorService: AuthenticationErrorService,
    private matDialogRef: MatDialogRef<AuthenticationDialogComponent>,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.playerSubscription = this.authenticationService.playerSubject.subscribe(
      (player: Player): void => {
        this.player = player;
        this.loading = false;
        if (this.player) {
          this.switchMode(Mode.Authenticated);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.playerSubscription.unsubscribe();
  }

  public switchMode(mode: Mode): void {
    this.signinFormGroup.reset();
    this.signupFormGroup.reset();
    this.passwordResetFormGroup.reset();
    clearFormState(this.state.signin);
    clearFormState(this.state.signup);
    clearFormState(this.state.passwordReset);
    clearFormState(this.state.signout);

    this.state.mode.set(mode);
  };

  public signinFormGroup = new FormGroup(
    {
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
        ]
      ),
      'password': new FormControl(
        '',
        [
          Validators.required
        ]
      )
    }
  );

  public matcher = new GlobalErrorStateMatcher();

  public onSignin(): void {
    clearFormState(this.state.signin);
    this.state.signin.loading = true;

    this.authenticationService.signin(
      this.signinFormGroup.value.email,
      this.signinFormGroup.value.password
    )
    .subscribe(
      (player: Player): void => {
        this.matDialogRef.close();
        this.signinFormGroup.reset();
        this.router.navigate(['/'])
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        this.state.signin.errors = this.authenticationErrorService.errorMessage(httpErrorResponse);
        this.state.signin.loading = false;
      }
    );
  }

  private mustMatch(field: string): ValidatorFn {
    return (abstractControl: AbstractControl): (ValidationErrors | null) => {
      if (!abstractControl.parent) {
        return null;
      }

      const matchingAbstractControl: AbstractControl = abstractControl.parent.get(field);

      const match: boolean = abstractControl.value === matchingAbstractControl.value;

      return match ? null : { fieldsMismatched: true };
    }
  }

  public signupFormGroup = new FormGroup(
    {
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
        ]
      ),
      'nickname': new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      'password': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ),
      'passwordConfirmation': new FormControl(
        '',
        [
          Validators.required,
          this.mustMatch('password')
        ]
      )
    }
  );

  public onSignup(): void {
    clearFormState(this.state.signup);
    this.state.signup.loading = true;

    this.authenticationService.signup(
      this.signupFormGroup.value.email,
      this.signupFormGroup.value.nickname,
      this.signupFormGroup.value.password,
      this.signupFormGroup.value.passwordConfirmation
    )
    .subscribe(
      (): void => {
        this.state.signup.loading = false;
        this.state.signup.success = true;
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        this.state.signup.errors = this.authenticationErrorService.errorMessage(httpErrorResponse);;
        this.state.signup.loading = false;
      }
    );
  }

  public passwordResetFormGroup = new FormGroup(
    {
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
        ]
      )
    }
  );

  public onPasswordReset(): void {
    clearFormState(this.state.passwordReset);
    this.state.passwordReset.loading = true;

    this.authenticationService.passwordResetRequest(
      this.passwordResetFormGroup.value.email
    )
    .subscribe(
      (): void => {
        this.state.passwordReset.loading = false;
        this.state.passwordReset.success = true;
        this.passwordResetFormGroup.reset();
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
      (): void => {
        this.state.signout.loading = false;
        this.state.signout.success = true;
        this.switchMode(Mode.Signin);
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        this.state.signout.errors = this.authenticationErrorService.errorMessage(httpErrorResponse);;
        this.state.signout.loading = false;
      }
    )
  }

}
