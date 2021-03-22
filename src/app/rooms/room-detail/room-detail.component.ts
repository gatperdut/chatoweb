import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { formState, FormState } from 'src/app/authentication/state/authentication-form.state';
import { Directions, DirectionStringIndex } from 'src/app/map/constants/map.constants';
import * as _ from 'underscore';
import { RoomData } from '../models/room.data';
import { Room } from '../models/room.model';
import { RoomActionsService } from '../services/room-actions.service';

@Component({
  selector: 'cw-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  public room: Room;

  public roomFormGroup: FormGroup;

  public readonly state: FormState = formState();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { room: Room },
    private roomActionsService: RoomActionsService,
    private matDialogRef: MatDialogRef<RoomDetailComponent>
  ) {

  }

  ngOnInit(): void {
    this.room = this.data.room;

    this.roomFormGroup = new FormGroup(
      {
        id: new FormControl(this.room.id),
        area_id: new FormControl(this.room.area_id),
        title: new FormControl(this.room.title, [Validators.required]),
        description: new FormControl(this.room.description, [Validators.required]),
        description_nighttime: new FormControl(this.room.description, [Validators.required]),
        arena: new FormControl(this.room.arena, [Validators.required]),
        always_lit: new FormControl(this.room.always_lit, [Validators.required]),
        enclosed: new FormControl(this.room.enclosed, [Validators.required]),
        roughness_multiplier: new FormControl(this.room.roughness_multiplier, [Validators.required])
      }
    );
    _.each(
      Directions,
      (direction: string): void => {
        this.roomFormGroup.addControl(direction + 'r_id', new FormControl(this.room.getAdjacentRoomId(direction)));
        this.roomFormGroup.addControl(direction + 'd_id', new FormControl(this.room.getDoorId(direction)));
      }
    )
    this.roomFormGroup.addControl
  }

  public onSubmit(): void {
    const observable: Observable<RoomData> = this.room.id ? this.roomActionsService.update(this.roomFormGroup.value) : this.roomActionsService.create(this.roomFormGroup.value);

    this.state.loading = true;
    observable.subscribe(
      (roomData: RoomData): void => {
        this.matDialogRef.close(roomData);
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        console.log(httpErrorResponse);
      },
      (): void => {
        this.state.loading = false;
      }
    );
  }

}
