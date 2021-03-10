import { Component, OnInit } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication/services/authentication.service';
import { Player } from './players/model/player.model';
import { SystemService } from './sidebar/system/services/system.service';

@Component({
  selector: 'cw-root',
  templateUrl: './cw.component.html',
  styleUrls: ['./cw.component.scss'],
  providers: [NgbTooltipConfig]
})
export class CwComponent implements OnInit {

  public loading: boolean = false;

  constructor(
    private systemService: SystemService,
    private authenticationService: AuthenticationService,
    ngbTooltipConfig: NgbTooltipConfig
  ) {
    ngbTooltipConfig.openDelay = 300;
  }

  ngOnInit(): void {
    this.loading = true;
    this.authenticationService.automaticSignin()
    .subscribe(
      (player: Player): void => {
        this.loading = false;
      }
    );

    this.systemService.fetch();
  }

}
