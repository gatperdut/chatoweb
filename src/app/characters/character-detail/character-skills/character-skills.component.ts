import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/shared/constants/constants.service';
import * as _ from 'underscore';
import { Character } from '../../models/character.model';
import { SkillSetData } from '../../models/skill-set.data';

@Component({
  selector: 'cw-character-skills',
  templateUrl: './character-skills.component.html',
  styleUrls: ['./character-skills.component.scss']
})
export class CharacterSkillsComponent implements OnInit {

  @Input() character: Character;
  @Input() characterFormGroup: FormGroup;

  public get skillSetFormGroupTypecast(): FormGroup {
    return <FormGroup>this.characterFormGroup.controls.skill_set;
  }

  constructor(
    public constantsService: ConstantsService
  ) {

  }

  ngOnInit(): void {
    _.each(
      this.constantsService.constants.skills.names,
      (skill: string): void => {
        const formControl = new FormControl(
          this.character.skill_set[skill as keyof SkillSetData],
          [
            Validators.required
          ]
        );

        this.skillSetFormGroupTypecast.addControl(skill, formControl);
      }
    )
  }

}
