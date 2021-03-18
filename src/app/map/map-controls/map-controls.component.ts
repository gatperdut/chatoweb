import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { World } from '../models/world.model';
import { MapViewerService } from '../services/map-viewer.service';

@Component({
  selector: 'cw-map-controls',
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss']
})
export class MapControlsComponent implements OnInit, OnDestroy {

  @Input() public world: World;

  public z: number;

  private zSubscription: Subscription;

  constructor(
    public mapViewerService: MapViewerService
  ) {

  }

  ngOnInit(): void {
    this.zSubscription = this.mapViewerService.zSubject.subscribe(
      (z: number): void => {
        this.z = z;
      }
    );
  }

  ngOnDestroy(): void {
    this.zSubscription.unsubscribe();
  }

}
