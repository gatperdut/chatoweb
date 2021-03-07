import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PlayerData } from './model/player-data.interface';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'cw-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  public playersData: PlayerData[] = [];

  constructor(
    private playerService: PlayerService
  ) {

  }

  ngOnInit(): void {
    this.playerService.index()
    .pipe(
      first()
    )
    .subscribe(
      (playersData: PlayerData[]): void => {
        this.playersData = playersData;
      }
    )
  }

}
