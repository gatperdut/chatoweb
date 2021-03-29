import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChipSeparatorKeysCodes } from 'src/app/shared/chips/chips.constants';
import { Slots } from 'src/app/shared/constants/slots.constants';
import * as _ from 'underscore';
import { ItemTemplateData } from '../models/item-template.data';

@Component({
  selector: 'cw-item-template-form',
  templateUrl: './item-template-form.component.html',
  styleUrls: ['./item-template-form.component.scss']
})
export class ItemTemplateFormComponent implements OnInit {

  public itemTemplateData: ItemTemplateData;

  public itemTemplateFormGroup: FormGroup;

  public chipSeparatorKeysCodes = ChipSeparatorKeysCodes;

  public Slots: string[] = Slots;

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
        possible_slots: new FormControl(this.itemTemplateData.possible_slots, []),
      }
    );
  }

  public onSubmit(): void {
    this.matDialogRef.close(this.itemTemplateFormGroup.value);
  }

  public onPossibleSlotRemoved(possibleSlot: string) {
    const possibleSlots = this.itemTemplateFormGroup.get('possible_slots').value as string[];
    const index = _.findIndex(possibleSlots, possibleSlot);
    possibleSlots.splice(index, 1);
    this.itemTemplateFormGroup.get('possible_slots').setValue(possibleSlots);
  }

}
