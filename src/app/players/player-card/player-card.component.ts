import { Component, Input, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/shared/animations/fade-in.animation';
import { Player } from '../model/player.model';

@Component({
  selector: 'cw-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  animations: [
    fadeInAnimation
  ]
})
export class PlayerCardComponent implements OnInit {

  @Input() player: Player;

  constructor(

  ) {

  }

  ngOnInit(): void {

  }

}
