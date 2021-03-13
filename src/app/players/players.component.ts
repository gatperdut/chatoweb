import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import * as _ from 'underscore';
import { Player } from './model/player.model';
import { PlayerActionsService } from './services/player-actions.service';
import { PlayerQuery } from './types/player-query.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cw-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  public players: Player[] = [];

  public loading: boolean = true;

  constructor(
    private playerActionsService: PlayerActionsService
  ) {

  }

  public playerQueryFormGroup = new FormGroup(
    {
      term: new FormControl(
        '',
        []
      ),
      roles: new FormControl(
        [],
        []
      ),
      status: new FormControl(
        'all',
        [
          Validators.required
        ]
      )
    }
  );

  ngOnInit(): void {
    this.query();
  }

  public query(): void {
    this.loading = true;

    this.playerActionsService.index(<PlayerQuery>this.playerQueryFormGroup.value)
    .pipe(
      first()
    )
    .subscribe(
      (players: Player[]): void => {
        this.loading = false;
        this.players = players;
      },
      (error: HttpErrorResponse): void => {
        this.loading = false;
      }
    )
  }

}
