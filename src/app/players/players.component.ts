import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import * as _ from 'underscore';
import { Player } from './model/player.model';
import { PlayerService } from './services/player.service';
import { PlayerRoleService } from './services/player-role.service';
import { PlayerQuery } from './types/player-query.type';
import { PlayerStatusService } from './services/player-status.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'cw-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  public players: Player[] = [];

  public loading: boolean = true;

  constructor(
    private playerService: PlayerService,
    private playerRoleService: PlayerRoleService,
    private playerStatusService: PlayerStatusService
  ) {

  }

  public playerQueryFormGroup = new FormGroup(
    {
      term: new FormControl(
        'sdfadsf',
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

    this.playerService.index(<PlayerQuery>this.playerQueryFormGroup.value)
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
