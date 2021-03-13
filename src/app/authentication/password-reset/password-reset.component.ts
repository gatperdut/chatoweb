import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalErrorStateMatcher } from 'src/app/shared/forms/global.error-state-matcher';
import { mustMatch } from 'src/app/shared/forms/must-match.validator';
import { AuthenticationErrorService } from '../services/authentication-error.service';
import { AuthenticationService } from '../services/authentication.service';
import { formState } from '../state/authentication-form.state';

@Component({
  selector: 'cw-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  private queryParamsSubscription: Subscription;

  public state = formState();

  private resetPasswordToken: string;

  public matcher = new GlobalErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private authenticationErrorService: AuthenticationErrorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (params: Params): void => {
        this.resetPasswordToken = params['reset_password_token'];

        if (!this.resetPasswordToken) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  public passwordResetFormGroup = new FormGroup(
    {
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
          mustMatch('password')
        ]
      )
    }
  );

  public onPasswordReset(): void {
    this.state.errors = null;
    this.state.loading = true;
    this.state.success = false;

    this.authenticationService.passwordResetUpdate(
      this.passwordResetFormGroup.value.password,
      this.passwordResetFormGroup.value.passwordConfirmation,
      this.resetPasswordToken
    )
    .subscribe(
      (): void => {
        this.state.loading = false;
        this.state.success = true;
        this.passwordResetFormGroup.reset();
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        this.state.errors = this.authenticationErrorService.errorMessage(httpErrorResponse);;
        this.state.loading = false;
      }
    );
  }
}
