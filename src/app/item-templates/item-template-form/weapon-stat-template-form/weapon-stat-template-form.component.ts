import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WeaponStatTemplateData } from '../../models/weapon_stat_template.data';

@Component({
  selector: 'cw-weapon-stat-template-form',
  templateUrl: './weapon-stat-template-form.component.html',
  styleUrls: ['./weapon-stat-template-form.component.scss']
})
export class WeaponStatTemplateFormComponent implements OnInit {

  @Input('weaponStatTemplate') weaponStatTemplateData: WeaponStatTemplateData

  public weaponStatTemplateFormGroup: FormGroup;

  constructor(

  ) {

  }

  ngOnInit(): void {

  }

}
