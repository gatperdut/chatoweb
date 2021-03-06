import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { Player } from 'src/app/players/model/player.model';
import { AuthenticationService } from '../services/authentication.service';
import { FormState, formState } from '../state/authentication-form.state';
import { AuthenticationSigninResponse } from '../types/authentication-signin-response.type';

@Component({
  selector: 'cw-unlocked',
  templateUrl: './unlocked.component.html',
  styleUrls: ['./unlocked.component.scss']
})
export class UnlockedComponent implements OnInit {

  public unlock: boolean;

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
        this.unlock = params['unlock'] === 'true';
      }
    );
  }

}
