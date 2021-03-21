import { D } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { World } from './models/world.model';
import { MapLayoutService } from './services/map-layout.service';
import { MapViewerService } from './services/map-viewer.service';
import { MapRendererService } from './services/map-renderer.service';
import { MapAnimatorService } from './services/map-animator.service';
import { Room } from '../rooms/models/room.model';
import { Channel } from 'actioncable';
import { WebsocketService } from '../services/websocket.service';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { MapCableEvent } from './cable/map-cable-event.type';
import { RoomService } from '../rooms/services/room.service';

@Component({
  selector: 'cw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  public rooms: Room[];

  private mapChannel: Channel;

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
    private mapAnimatorService: MapAnimatorService,
    private websocketService: WebsocketService,
    private authenticationService: AuthenticationService,
    private roomService: RoomService
  ) {

  }

  ngOnInit(): void {
    this.rooms = this.activatedRoute.snapshot.data['rooms'];

    this.mapChannel = this.activatedRoute.snapshot.data['mapChannel'];

    this.world = this.mapLayoutService.process(this.rooms);

    this.mapChannel = this.websocketService.cable.subscriptions.create(
      {
        channel: 'MapChannel',
        action_cable_uid: this.authenticationService.player.action_cable_uid
      },
      {
        connected: function() {
          console.log('Connected to MapChannel.');
        },
        disconnected: function( ){
          console.log('Disconnected from MapChannel.');
        },
        received: this.handleCable.bind(this)
      }
    );

  }

  ngAfterViewInit(): void {
    this.container = d3.select('#mapContainer');

    this.svg = this.container.append("svg");

    this.mapRendererService.markers(this.svg);

    this.mapRendererService.zoom(this.svg, this.world);
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

  private handleCable(mapCableEvent: MapCableEvent): void {
    switch(mapCableEvent.model) {
      case 'room':
        switch(mapCableEvent.action) {
          case 'update':
            const newRoom: Room = this.roomService.craftRoom(mapCableEvent.room);
            this.world.replaceRoom(newRoom);
            this.mapRendererService.render(this.svg, this.world, this.z);
            break;
          default:
            throw new Error('Unhandled map room action ' + mapCableEvent.action);
        }
        break;
      default:
        throw new Error('Unhandled map cable model ' + mapCableEvent.model);
    }
  }

  ngOnDestroy(): void {
    this.zSubscription.unsubscribe();

    this.mapAnimatorService.unselectNodes(this.svg);

    this.mapChannel.unsubscribe();
  }

}
