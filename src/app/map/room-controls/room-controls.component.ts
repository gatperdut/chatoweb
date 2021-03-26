import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MapViewerService } from '../services/map-viewer.service';
import { Node } from '../models/node.model';
import { RoomDetailComponent } from 'src/app/rooms/room-detail/room-detail.component';
import { DirectionStringIndex, DoorAction, MapUtils, NodeAction } from '../constants/map.constants';
import { RoomService } from 'src/app/rooms/services/room.service';
import { RoomActionsService } from 'src/app/rooms/services/room-actions.service';
import { RoomData } from 'src/app/rooms/models/room.data';
import * as _ from 'underscore';
import { DoorService } from 'src/app/rooms/services/door.service';
import { DoorData } from 'src/app/rooms/models/door.data';
import { DoorActionsService } from 'src/app/rooms/services/door-actions.service';
import { DoorDetailComponent } from 'src/app/rooms/door-detail/door-detail.component';
import { Link } from '../models/link.model';

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

  public NodeAction = NodeAction;

  public DoorAction = DoorAction;

  constructor(
    private mapViewerService: MapViewerService,
    private roomService: RoomService,
    private doorService: DoorService,
    private roomActionsService: RoomActionsService,
    private doorActionsService: DoorActionsService,
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

  public createRoom(direction: DirectionStringIndex): void {
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
    const roomData: RoomData = { ...this.node.room };

    const adjacentNode: Node = this.node.adjacentNode(direction);

    this.roomService.setAdjacentRoomId(roomData, direction, adjacentNode.id);

    this.roomActionsService.update(roomData).subscribe();
  }

  public unlinkRoom(direction: DirectionStringIndex): void {
    const roomData: RoomData = { ...this.node.room };

    this.roomService.setAdjacentRoomId(roomData, direction, null);

    this.roomActionsService.update(roomData).subscribe();
  }

  public createDoor(direction: DirectionStringIndex): void {
    const doorData = this.doorService.emptyDoor();

    this.doorService.setAdjacentRoomId(doorData, direction, this.node.room.getConnectedRoomId(direction));
    this.doorService.setAdjacentRoomId(doorData, MapUtils.OppositeDirection[direction], this.node.id);

    this.matDialog.open(DoorDetailComponent, { width: '500px', data: { doorData: doorData } })
    .afterClosed()
    .subscribe(
      (doorData: DoorData) => {
        if (!doorData) {
          return;
        }

        this.doorActionsService.create(doorData).subscribe();
      }
    );
  }

  public removeDoor(direction: DirectionStringIndex): void {
    const link: Link = this.node.link(direction);

    this.doorActionsService.destroy(link.door.id).subscribe();
  }
}
