import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectionStringIndex, MapUtils } from 'src/app/map/constants/map.constants';
import * as _ from 'underscore';
import { RoomData } from '../models/room.data';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'cw-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  public roomData: RoomData;

  public roomFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { roomData: RoomData },
    private matDialogRef: MatDialogRef<RoomDetailComponent>,
    private roomService: RoomService
  ) {

  }

  ngOnInit(): void {
    this.roomData = this.data.roomData;

    this.roomFormGroup = new FormGroup(
      {
        id: new FormControl(this.roomData.id),
        area_id: new FormControl(this.roomData.area_id),
        title: new FormControl(this.roomData.title, [Validators.required]),
        description: new FormControl(this.roomData.description, [Validators.required]),
        description_nighttime: new FormControl(this.roomData.description, []),
        arena: new FormControl(this.roomData.arena, [Validators.required]),
        always_lit: new FormControl(this.roomData.always_lit, [Validators.required]),
        enclosed: new FormControl(this.roomData.enclosed, [Validators.required]),
        roughness_multiplier: new FormControl(this.roomData.roughness_multiplier, [Validators.required])
      }
    );
    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        this.roomFormGroup.addControl(direction + 'r_id', new FormControl(this.roomService.getAdjacentRoomId(this.roomData, direction)));
      }
    )
    this.roomFormGroup.addControl
  }

  public onSubmit(): void {
    this.matDialogRef.close(this.roomFormGroup.value);
  }

}
