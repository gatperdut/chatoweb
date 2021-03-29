import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemTemplateData } from '../models/item-template.data';

@Component({
  selector: 'cw-item-template-form',
  templateUrl: './item-template-form.component.html',
  styleUrls: ['./item-template-form.component.scss']
})
export class ItemTemplateFormComponent implements OnInit {

  public itemTemplateData: ItemTemplateData;

  public itemTemplateFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { itemTemplateData: ItemTemplateData },
    private matDialogRef: MatDialogRef<ItemTemplateFormComponent>,
  ) {

  }

  ngOnInit(): void {
    this.itemTemplateData = this.data.itemTemplateData;

    this.itemTemplateFormGroup = new FormGroup(
      {
        id: new FormControl(this.itemTemplateData.id, []),
        code: new FormControl(this.itemTemplateData.code, []),
        short_desc: new FormControl(this.itemTemplateData.short_desc, [Validators.required]),
        long_desc: new FormControl(this.itemTemplateData.long_desc, [Validators.required]),
        full_desc: new FormControl(this.itemTemplateData.full_desc, [Validators.required]),
        is_sheath: new FormControl(this.itemTemplateData.is_sheath, [Validators.required]),
        is_quiver: new FormControl(this.itemTemplateData.is_quiver, [Validators.required]),
        possible_slots: new FormControl(this.itemTemplateData.possible_slots, [Validators.required]),
      }
    );
  }

  public onSubmit(): void {
    this.matDialogRef.close(this.itemTemplateFormGroup.value);
  }

}
