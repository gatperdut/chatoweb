import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { WeaponStatTemplateData } from '../../models/weapon_stat_template.data';

@Component({
  selector: 'cw-weapon-stat-template-form',
  templateUrl: './weapon-stat-template-form.component.html',
  styleUrls: ['./weapon-stat-template-form.component.scss']
})
export class WeaponStatTemplateFormComponent implements OnInit {

  @Input('weaponStatTemplateData') weaponStatTemplateData: WeaponStatTemplateData;

  @Input('itemTemplateFormGroup') itemTemplateFormGroup: FormGroup;

  public weaponStatTemplateFormGroup: FormGroup;

  constructor(
  ) {

  }

  ngOnInit(): void {
    this.weaponStatTemplateFormGroup = new FormGroup(
      {
        id: new FormControl(this.weaponStatTemplateData.id, []),
        item_template_id: new FormControl(this.weaponStatTemplateData.item_template_id, []),
        grip: new FormControl(this.weaponStatTemplateData.grip, [Validators.required])
      }
    )

    setTimeout(this.setForm.bind(this));
  }

  private setForm(): void {
    this.itemTemplateFormGroup.addControl('weapon_stat_template', this.weaponStatTemplateFormGroup);
  }

}
