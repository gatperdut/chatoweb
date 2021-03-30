import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RangedStatTemplateData } from 'src/app/item-templates/models/ranged-stat-template.data';
import { MissileTypes } from 'src/app/shared/constants/missile-types.constants';

@Component({
  selector: 'cw-ranged-stat-template-form',
  templateUrl: './ranged-stat-template-form.component.html',
  styleUrls: ['./ranged-stat-template-form.component.scss']
})
export class RangedStatTemplateFormComponent implements OnInit {

  @Input('rangedStatTemplateData') rangedStatTemplateData: RangedStatTemplateData;

  @Input('weaponStatTemplateFormGroup') weaponStatTemplateFormGroup: FormGroup;

  public rangedStatTemplateFormGroup: FormGroup;

  public MissileTypes: string[] = MissileTypes;

  constructor() {

  }

  ngOnInit(): void {
    this.rangedStatTemplateFormGroup = new FormGroup(
      {
        id: new FormControl(this.rangedStatTemplateData.id, []),
        weapon_stat_template_id: new FormControl(this.rangedStatTemplateData.weapon_stat_template_id, []),
        missile_type: new FormControl(this.rangedStatTemplateData.missile_type, [Validators.required]),
        ranges_suitability: new FormControl(this.rangedStatTemplateData.ranges_suitability, [Validators.minLength(4)]),
        can_remain_loaded: new FormControl(this.rangedStatTemplateData.can_remain_loaded, [Validators.required])
      }
    )

    setTimeout(this.setForm.bind(this));
  }

  private setForm(): void {
    this.weaponStatTemplateFormGroup.addControl('ranged_stat_template', this.rangedStatTemplateFormGroup);
  }

}
