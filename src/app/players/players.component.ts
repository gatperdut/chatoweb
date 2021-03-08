import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Player } from './model/player.model';
import { PlayerService } from './services/player.service';
import { PlayerQuery } from './types/player-query.type';

@Component({
  selector: 'cw-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  public players: Player[] = [];

  constructor(
    private playerService: PlayerService
  ) {

  }

  public playerQuery: PlayerQuery = {
    nickname: ''
  };

  ngOnInit(): void {
    this.query();
  }

  public query(): void {
    this.playerService.query(this.playerQuery)
    .pipe(
      first()
    )
    .subscribe(
      (players: Player[]): void => {
        this.players = players;
      }
    )
  }

}
