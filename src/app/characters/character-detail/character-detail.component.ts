import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from 'src/app/shared/animations/fade-in.animation';
import { Character } from '../models/character.model';

@Component({
  selector: 'cw-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  animations: [
    fadeInAnimation
  ]
})
export class CharacterDetailComponent implements OnInit {

  public character: Character;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.character = this.activatedRoute.snapshot.data['character'];
  }

}
