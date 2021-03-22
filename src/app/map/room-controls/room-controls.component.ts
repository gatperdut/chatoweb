import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MapViewerService } from '../services/map-viewer.service';
import { Node } from '../models/node.model';
import { RoomDetailComponent } from 'src/app/rooms/room-detail/room-detail.component';
import { Directions, DirectionStringIndex, OppositeDirection } from '../constants/map.constants';
import { RoomService } from 'src/app/rooms/services/room.service';
import { Room } from 'src/app/rooms/models/room.model';

@Component({
  selector: 'cw-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss']
})
export class RoomControlsComponent implements OnInit, OnDestroy {

  private nodeSubscription: Subscription;

  public node: Node = null;

  public Directions = Directions;

  constructor(
    private mapViewerService: MapViewerService,
    private roomService: RoomService,
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
    const dialogRef = this.matDialog.open(RoomDetailComponent, { width: '500px', data: { room: this.node.room } });
  }

  public addRoom(direction: string): void {
    const room: Room = this.roomService.emptyRoom();

    room.area_id = this.node.room.area_id;
    room.setAdjacentRoomId(OppositeDirection[direction as DirectionStringIndex], this.node.id);

    const dialogRef = this.matDialog.open(RoomDetailComponent, { width: '500px', data: { room: room } });
  }
}
