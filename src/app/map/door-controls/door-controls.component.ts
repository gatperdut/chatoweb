import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DoorDetailComponent } from 'src/app/rooms/door-detail/door-detail.component';
import { DoorData } from 'src/app/rooms/models/door.data';
import { DoorActionsService } from 'src/app/rooms/services/door-actions.service';
import { Link } from '../models/link.model';
import { MapViewerService } from '../services/map-viewer.service';

@Component({
  selector: 'cw-door-controls',
  templateUrl: './door-controls.component.html',
  styleUrls: ['./door-controls.component.scss']
})
export class DoorControlsComponent implements OnInit {

  private linkSubscription: Subscription;

  public link: Link = null;

  constructor(
    private mapViewerService: MapViewerService,
    private doorActionsService: DoorActionsService,
    private matDialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.linkSubscription = this.mapViewerService.linkSubject.subscribe(
      (link: Link): void => {
        this.link = link;
      }
    );
  }

  ngOnDestroy(): void {
    this.linkSubscription.unsubscribe();
  }

  public editDoor(): void {
    this.matDialog.open(DoorDetailComponent, { width: '500px', data: { doorData: this.link.door } })
    .afterClosed()
    .subscribe(
      (doorData: DoorData) => {
        if (!doorData) {
          return;
        }

        this.doorActionsService.update(doorData).subscribe();
      }
    );
  }

  public removeDoor(): void {
    this.doorActionsService.destroy(this.link.door.id).subscribe();
  }

}
