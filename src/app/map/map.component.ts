import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from './models/room.model';
import { MapLayoutService } from './services/map-layout.service';

@Component({
  selector: 'cw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('sigmaContainer') private sigmaContainer: ElementRef;

  public rooms: Room[];

  public graphData: SigmaJs.GraphData;

  public sigmaInstance: SigmaJs.Sigma;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mapLayoutService: MapLayoutService
  ) {

  }

  ngOnInit(): void {
    this.rooms = this.activatedRoute.snapshot.data['rooms'];

    this.graphData = this.mapLayoutService.process(this.rooms);
  }

  ngAfterViewInit(): void {
    this.sigmaInstance = new sigma(
      {
        graph: this.graphData,
        container: this.sigmaContainer.nativeElement
      }
    );
  }

}
