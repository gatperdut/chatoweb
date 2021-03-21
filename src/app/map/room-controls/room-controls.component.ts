import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapViewerService } from '../services/map-viewer.service';
import { Node } from '../models/node.model';
import { RoomDetailComponent } from 'src/app/rooms/room-detail/room-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cw-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss']
})
export class RoomControlsComponent implements OnInit, OnDestroy {

  private nodeSubscription: Subscription;

  public node: Node = null;

  constructor(
    private mapViewerService: MapViewerService,
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

}
