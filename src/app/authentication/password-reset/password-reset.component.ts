import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(
    private authenticationService: AuthenticationService,
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

  public onResetPassword(passwordResetForm: NgForm): void {
    this.state.errored = false;
    this.state.loading = true;
    this.state.success = false;

    this.authenticationService.passwordResetUpdate(
      passwordResetForm.form.value.password,
      passwordResetForm.form.value.passwordConfirmation,
      this.resetPasswordToken
    )
    .subscribe(
      (data: any): void => {
        this.state.loading = false;
        this.state.success = true;
        passwordResetForm.reset();
      },
      (error: any): void => {
        this.state.errored = true;
        this.state.loading = false;
      }
    )
  }
}
