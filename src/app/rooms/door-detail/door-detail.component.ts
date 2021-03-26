import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectionStringIndex, MapUtils } from 'src/app/map/constants/map.constants';
import * as _ from 'underscore';
import { DoorData } from '../models/door.data';
import { DoorService } from '../services/door.service';

@Component({
  selector: 'cw-door-detail',
  templateUrl: './door-detail.component.html',
  styleUrls: ['./door-detail.component.scss']
})
export class DoorDetailComponent implements OnInit {

  public doorData: DoorData;

  public doorFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { doorData: DoorData },
    private matDialogRef: MatDialogRef<DoorDetailComponent>,
    private doorService: DoorService
  ) {

  }

  ngOnInit(): void {
    this.doorData = this.data.doorData;

    this.doorFormGroup = new FormGroup(
      {
        id: new FormControl(this.doorData.id),
        short_desc: new FormControl(this.doorData.short_desc, [Validators.required]),
        long_desc: new FormControl(this.doorData.long_desc, [Validators.required]),
        full_desc: new FormControl(this.doorData.full_desc, [Validators.required]),
        open: new FormControl(this.doorData.open, [Validators.required]),
        see_through: new FormControl(this.doorData.see_through, [Validators.required])
      }
    );
    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        this.doorFormGroup.addControl(direction + 'r_id', new FormControl(this.doorService.getAdjacentRoomId(this.doorData, direction)));
      }
    );
  }

  public onSubmit(): void {
    this.matDialogRef.close(this.doorFormGroup.value);
  }

}
