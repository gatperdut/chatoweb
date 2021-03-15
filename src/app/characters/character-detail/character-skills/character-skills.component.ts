import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/shared/constants/services/constants.service';
import * as _ from 'underscore';
import { Character } from '../../models/character.model';
import { SkillSetData } from '../../models/skill-set.data';
import { SkillSetService } from '../../services/skill-set.service';

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
    public constantsService: ConstantsService,
    public skillSetService: SkillSetService
  ) {
  }

  ngOnInit(): void {
    const mergedList: string[] = _.union(
      this.constantsService.constants.skills.names.all,
      this.constantsService.constants.skill_categories.names
    );

    _.each(
      mergedList,
      (skill: string): void => {
        const formControl = new FormControl(
          this.character.skill_set[skill as keyof SkillSetData],
          [
            Validators.required
          ]
        );

        this.skillSetFormGroupTypecast.addControl(skill, formControl);
      }
    );
  }

  public rateIcon: { [key: string]: string} = {
    limited:       'fa-arrow-circle-down',
    below_average: 'fa-arrow-down',
    standard:      'fa-adjust',
    above_average: 'fa-arrow-up',
    plus:          'fa-arrow-circle-up'
  };
}
