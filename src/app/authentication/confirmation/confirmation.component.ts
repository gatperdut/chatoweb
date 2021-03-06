import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'cw-authentication-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  public accountConfirmationSuccess: boolean;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(
      first()
    )
    .subscribe(
      (params: Params): void => {
        this.accountConfirmationSuccess = params['account_confirmation_success'] === 'true';
      }
    );
  }

  ngOnDestroy(): void {

  }

}
