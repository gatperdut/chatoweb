import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from './models/room.model';
import { MapLayoutService } from './services/map-layout.service';
import { Network, Data } from 'vis';
import { World } from './models/world.model';

@Component({
  selector: 'cw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private throttler: ReturnType<typeof setTimeout>;

  @ViewChild('visContainer') visContainer: ElementRef;

  private resize(): void {
    this.visContainer.nativeElement.style.height = (window.innerHeight - 64) + 'px';
    this.throttler = null;
  }

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

  private network: Network;

  private world: World;

  public rooms: Room[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private mapLayoutService: MapLayoutService
  ) {

  }

  ngOnInit(): void {
    this.rooms = this.activatedRoute.snapshot.data['rooms'];
  }

  ngAfterViewInit() {
    const container = this.visContainer.nativeElement;

    this.world = this.mapLayoutService.process(this.rooms);

    var options = {
      nodes: {
        shape: 'box',
        fixed: true,
        widthConstraint: 200,
        heightConstraint: 200
      }
    };

    this.resize();

    this.network = new Network(container, this.world[0], options);
  }

}
