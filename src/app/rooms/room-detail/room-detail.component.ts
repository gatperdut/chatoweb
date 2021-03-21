import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formState, FormState } from 'src/app/authentication/state/authentication-form.state';
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
    private roomActionsService: RoomActionsService
  ) {

  }

  ngOnInit(): void {
    this.room = this.data.room;

    this.roomFormGroup = new FormGroup(
      {
        id: new FormControl(
          this.room.id
        ),
        title: new FormControl(
          this.room.title,
          [Validators.required]
        ),
        description: new FormControl(
          this.room.description,
          [Validators.required]
        )
      }
    );
  }

  public onSubmit(): void {
    this.state.loading = true;
    this.roomActionsService.update(this.roomFormGroup.value).subscribe(
      (roomData: RoomData): void => {
        console.log(roomData);
      },
      (httpErrorResponse: HttpErrorResponse): void => {
        console.log(httpErrorResponse);
      }
    );
  }

}
