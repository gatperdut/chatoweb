import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    private mapViewerService: MapViewerService
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

}
