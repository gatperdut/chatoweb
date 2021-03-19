import { D } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { Room } from './models/room.model';
import { World } from './models/world.model';
import { MapLayoutService } from './services/map-layout.service';
import { MapViewerService } from './services/map-viewer.service';
import { MapRendererService } from './services/renderers/map-renderer.service';
import { RoomsRendererService } from './services/renderers/rooms-renderer.service';

@Component({
  selector: 'cw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  public rooms: Room[];

  private throttler: ReturnType<typeof setTimeout>;

  public world: World;

  public z: number;

  private svg: any;

  private zSubscription: Subscription;

  private container: any;

  @HostListener('window:resize')
  onResize(): void {
    if (!this.throttler) {
      this.throttler = setTimeout(
        this.resize.bind(this),
        66
      );
      clearTimeout()
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private mapViewerService: MapViewerService,
    private mapLayoutService: MapLayoutService,
    private mapRendererService: MapRendererService,
    private roomsRendererService: RoomsRendererService
  ) {

  }

  ngOnInit(): void {
    this.rooms = this.activatedRoute.snapshot.data['rooms'];

    this.world = this.mapLayoutService.process(this.rooms);
  }

  ngAfterViewInit(): void {
    this.container = d3.select('#mapContainer');

    this.svg = this.container.append("svg");

    // this.mapRendererService.render(this.g, this.world, this.z);

    this.roomsRendererService.zoom(this.svg);
    this.resize();

    this.zSubscription = this.mapViewerService.zSubject.subscribe(
      (z: number): void => {
        this.z = z;
        this.mapRendererService.render(this.svg, this.world, this.z);
      }
    );
  }

  private resize(): void {
    this.svg
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight - 68);

    this.throttler = null;
  }


  ngOnDestroy(): void {
    this.zSubscription.unsubscribe();
  }

}
