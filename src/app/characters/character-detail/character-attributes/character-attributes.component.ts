import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/shared/constants/constants.service';
import * as _ from 'underscore';
import { AttributeSetData } from '../../models/attribute-set.data';
import { Character } from '../../models/character.model';
import { AttributeSetService } from '../../services/attribute-set.service';

@Component({
  selector: 'cw-character-attributes',
  templateUrl: './character-attributes.component.html',
  styleUrls: ['./character-attributes.component.scss']
})
export class CharacterAttributesComponent implements OnInit {

  @Input() character: Character;
  @Input() characterFormGroup: FormGroup;

  public get attributeSetFormGroupTypecast(): FormGroup {
    return <FormGroup>this.characterFormGroup.controls.attribute_set;
  }

  constructor(
    public attributeSetService: AttributeSetService,
    public constantsService: ConstantsService
  ) {

  }

  ngOnInit(): void {
    _.each(
      this.constantsService.constants.attributes.list,
      (attribute: string): void => {
        const formControl = new FormControl(
          this.character.attribute_set[attribute as keyof AttributeSetData],
          [
            Validators.required
          ]
        );

        this.attributeSetFormGroupTypecast.addControl(attribute, formControl);
      }
    )
  }

}
