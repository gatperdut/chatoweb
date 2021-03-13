import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from 'src/app/shared/animations/fade-in.animation';
import { chipSeparatorKeysCodes } from 'src/app/shared/chips/chips.constants';
import { ConstantsService } from 'src/app/shared/constants/constants.service';
import * as _ from 'underscore';
import { AttributeSetData } from '../models/attribute-set.data';
import { Character } from '../models/character.model';
import { AttributeSetService } from '../services/attribute-set.service';

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

  public characterFormGroup: FormGroup;

  public chipSeparatorKeysCodes = chipSeparatorKeysCodes;

  constructor(
    private activatedRoute: ActivatedRoute,
    public constantsService: ConstantsService,
    public attributeSetService: AttributeSetService
  ) {

  }

  ngOnInit(): void {
    this.character = this.activatedRoute.snapshot.data['character'];

    this.characterFormGroup = new FormGroup(
      {
        name: new FormControl(
          this.character.name,
          [Validators.required]
        ),
        short_desc: new FormControl(
          this.character.short_desc,
          [Validators.required]
        ),
        long_desc: new FormControl(
          this.character.long_desc,
          [Validators.required]
        ),
        full_desc: new FormControl(
          this.character.full_desc,
          [Validators.required]
        ),
        kwords: new FormControl(
          this.character.kwords,
          [Validators.minLength(1)]
        ),
        attribute_set: new FormGroup({})
      }
    );

    _.each(
      this.constantsService.constants.attributes.list,
      (attribute: string): void => {
        const formControl = new FormControl(
          this.character.attribute_set[attribute as keyof AttributeSetData],
          [
            Validators.required
          ]
        );

        (<FormGroup>this.characterFormGroup.controls.attribute_set).controls[attribute] = formControl;
      }
    )
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value || '';

    if (value.trim()) {
      this.characterFormGroup.controls.kwords.value.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  public remove(kword: string): void {
    const index = this.characterFormGroup.controls.kwords.value.indexOf(kword);

    if (index >= 0) {
      this.characterFormGroup.controls.kwords.value.splice(index, 1);
    }
  }

}
