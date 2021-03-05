import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'cw-authentication-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  constructor(
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
