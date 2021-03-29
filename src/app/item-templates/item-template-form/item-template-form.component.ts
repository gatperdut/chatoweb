import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
        id: new FormControl(this.itemTemplateData.id)
      }
    );
  }

  public onSubmit(): void {
    this.matDialogRef.close(this.itemTemplateFormGroup.value);
  }

}
