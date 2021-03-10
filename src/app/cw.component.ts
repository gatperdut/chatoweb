import { Component, OnInit } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { SystemService } from './sidebar/system/services/system.service';

@Component({
  selector: 'cw-root',
  templateUrl: './cw.component.html',
  styleUrls: ['./cw.component.scss'],
  providers: [NgbTooltipConfig]
})
export class CwComponent implements OnInit {

  constructor(
    private systemService: SystemService,
    ngbTooltipConfig: NgbTooltipConfig
  ) {
    ngbTooltipConfig.openDelay = 300;
  }

  ngOnInit(): void {
    this.systemService.fetch();
  }

}
