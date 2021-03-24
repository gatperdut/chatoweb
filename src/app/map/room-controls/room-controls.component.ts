import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MapViewerService } from '../services/map-viewer.service';
import { Node } from '../models/node.model';
import { RoomDetailComponent } from 'src/app/rooms/room-detail/room-detail.component';
import { DirectionStringIndex, MapUtils } from '../constants/map.constants';
import { RoomService } from 'src/app/rooms/services/room.service';
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

  public Directions = MapUtils.Directions;

  public DirectionToString = MapUtils.DirectionToString;

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
    const roomData: RoomData = { ...this.node.room }

    this.matDialog.open(RoomDetailComponent, { width: '500px', data: { roomData: roomData } })
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

  public addRoom(direction: DirectionStringIndex): void {
    const roomData: RoomData = this.roomService.emptyRoom();

    roomData.area_id = this.node.room.area_id;

    this.roomService.setAdjacentRoomId(roomData, MapUtils.OppositeDirection[direction], this.node.id);

    this.matDialog.open(RoomDetailComponent, { width: '500px', data: { roomData: roomData } })
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

  public linkRoom(direction: DirectionStringIndex): void {

  }

  public unlinkRoom(direction: DirectionStringIndex): void {
    const roomData: RoomData = { ...this.node.room };

    this.roomService.setAdjacentRoomId(roomData, direction, null);

    this.roomActionsService.update(roomData).subscribe();
  }
}
