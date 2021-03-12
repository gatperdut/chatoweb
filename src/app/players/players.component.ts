import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import * as _ from 'underscore';
import { Player } from './model/player.model';
import { PlayerService } from './services/player.service';
import { PlayerRoleService } from './services/player-role.service';
import { PlayerQuery } from './types/player-query.type';
import { PlayerStatusService } from './services/player-status.service';
import { GlobalErrorStateMatcher } from '../shared/forms/global.error-state-matcher';
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
    private playerService: PlayerService,
    private playerRoleService: PlayerRoleService,
    private playerStatusService: PlayerStatusService
  ) {

  }

  public matcher = new GlobalErrorStateMatcher();

  public playerQueryFormGroup = new FormGroup(
    {
      'term': new FormControl(
        '',
        []
      ),
      'roles[]': new FormControl(
        '',
        []
      ),
      'status': new FormControl(
        '',
        []
      )
    }
  );

  public playerQuery: PlayerQuery = {
    term: '',
    roles: [],
    _roles: {
      regular: false,
      admin: false,
      owner: false
    },
    status: ''
  };

  ngOnInit(): void {
    this.query();
  }

  public updateRoles(): void {
    this.playerQuery.roles = [];

    _.each(
      this.playerRoleService.roles,
      (role: string): void => {
        if (this.playerQuery._roles[role]) {
          this.playerQuery.roles.push(role);
        }
      }
    );

    this.query();
  }

  public query(): void {
    this.loading = true;

    this.playerService.index(this.playerQuery)
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
