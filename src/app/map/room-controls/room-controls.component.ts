import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MapViewerService } from '../services/map-viewer.service';
import { Node } from '../models/node.model';
import { RoomDetailComponent } from 'src/app/rooms/room-detail/room-detail.component';
import { Directions, DirectionStringIndex, DirectionToString, OppositeDirection } from '../constants/map.constants';
import { RoomService } from 'src/app/rooms/services/room.service';
import { Room } from 'src/app/rooms/models/room.model';
import { RoomActionsService } from 'src/app/rooms/services/room-actions.service';
import { RoomData } from 'src/app/rooms/models/room.data';

@Component({
  selector: 'cw-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss']
})
export class RoomControlsComponent implements OnInit, OnDestroy {

  private nodeSubscription: Subscription;

  public node: Node = null;

  public Directions = Directions;

  public DirectionToString = DirectionToString;

  constructor(
    private mapViewerService: MapViewerService,
    private roomService: RoomService,
    private roomActionsService: RoomActionsService,
    private matDialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.nodeSubscription = this.mapViewerService.nodeSubject.subscribe(
      (node: Node): void => {
        this.node = node;
      }
    );
  }

  ngOnDestroy(): void {
    this.nodeSubscription.unsubscribe();
  }

  public editRoom(): void {
    this.matDialog.open(RoomDetailComponent, { width: '500px', data: { room: this.node.room } })
    .afterClosed()
    .subscribe(
      (roomData: RoomData) => {
        if (!roomData) {
          return;
        }

        this.roomActionsService.update(roomData).subscribe();
      }
    );
  }

  public addRoom(direction: string): void {
    const room: Room = this.roomService.emptyRoom();
    room.area_id = this.node.room.area_id;

    room.setAdjacentRoomId(OppositeDirection[direction as DirectionStringIndex], this.node.id);

    this.matDialog.open(RoomDetailComponent, { width: '500px', data: { room: room } })
    .afterClosed()
    .subscribe(
      (roomData: RoomData) => {
        if (!roomData) {
          return;
        }

        this.roomActionsService.create(roomData).subscribe();
      }
    );
  }

  public linkRoom(direction: string): void {

  }

  public unlinkRoom(direction: string): void {
    this.node.room.setAdjacentRoomId(direction, null);

    this.roomActionsService.update(this.node.room);
  }
}
