import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Grips } from 'src/app/shared/constants/grips.constants';
import { WeaponBases } from 'src/app/shared/constants/weapon-bases.constants';
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

  public Grips: string[] = Grips;

  public WeaponBases: string[] = WeaponBases;

  constructor(
  ) {

  }

  ngOnInit(): void {
    this.weaponStatTemplateFormGroup = new FormGroup(
      {
        id: new FormControl(this.weaponStatTemplateData.id, []),
        item_template_id: new FormControl(this.weaponStatTemplateData.item_template_id, []),
        base: new FormControl(this.weaponStatTemplateData.base, [Validators.required]),
        grip: new FormControl(this.weaponStatTemplateData.grip, [Validators.required]),
        roll_mod: new FormControl(this.weaponStatTemplateData.roll_mod, [Validators.required]),
        critical_mod: new FormControl(this.weaponStatTemplateData.critical_mod, [Validators.required]),
      }
    )

    setTimeout(this.setForm.bind(this));
  }

  private setForm(): void {
    this.itemTemplateFormGroup.addControl('weapon_stat_template', this.weaponStatTemplateFormGroup);
  }

}
