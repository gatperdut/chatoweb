import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MeleeStatTemplateData } from 'src/app/item-templates/models/melee-stat-template.data';

@Component({
  selector: 'cw-melee-stat-template-form',
  templateUrl: './melee-stat-template-form.component.html',
  styleUrls: ['./melee-stat-template-form.component.scss']
})
export class MeleeStatTemplateFormComponent implements OnInit {

  @Input('meleeStatTemplateData') meleeStatTemplateData: MeleeStatTemplateData;

  @Input('weaponStatTemplateFormGroup') weaponStatTemplateFormGroup: FormGroup;

  public meleeStatTemplateFormGroup: FormGroup;

  constructor(

  ) {

  }

  ngOnInit(): void {
    this.meleeStatTemplateFormGroup = new FormGroup(
      {
        id: new FormControl(this.meleeStatTemplateData.id, []),
        weapon_stat_template_id: new FormControl(this.meleeStatTemplateData.weapon_stat_template_id, []),
        sheathed_desc: new FormControl(this.meleeStatTemplateData.sheathed_desc, [Validators.required])
      }
    )

    setTimeout(this.setForm.bind(this));
  }

  private setForm(): void {
    this.weaponStatTemplateFormGroup.addControl('melee_stat_template', this.meleeStatTemplateFormGroup);
  }

}
