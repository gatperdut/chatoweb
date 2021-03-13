import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemService } from './services/system.service';
import { SystemInfo } from './types/system-info.type';

@Component({
  selector: 'cw-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  public systemInfo: SystemInfo;

  constructor(
    private systemService: SystemService
  ) {

  }

  ngOnInit(): void {
    this.systemInfo = this.systemService.systemInfo;
  }

}
