import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { pipe, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication/services/authentication.service';
import { Player } from './players/model/player.model';
import { SidebarService } from './services/sidebar.service';
import { SystemService } from './system/services/system.service';

@Component({
  selector: 'cw-root',
  templateUrl: './cw.component.html',
  styleUrls: ['./cw.component.scss'],
  providers: [NgbTooltipConfig]
})
export class CwComponent implements OnInit, OnDestroy {
  @ViewChild('sidebar') private sidebar: MatSidenav;

  public loading: boolean = false;

  private sidebarSubscription: Subscription;

  private automaticSigninSubscription: Subscription;

  constructor(
    private systemService: SystemService,
    private authenticationService: AuthenticationService,
    ngbTooltipConfig: NgbTooltipConfig,
    private sidebarService: SidebarService
  ) {
    ngbTooltipConfig.openDelay = 300;
  }

  ngOnInit(): void {
    this.loading = true;
    this.automaticSigninSubscription = this.authenticationService.automaticSignin()
    .subscribe(
      (player: Player): void => {
        this.loading = false;
      }
    );

    this.sidebarSubscription = this.sidebarService.sidebarSubject.subscribe(
      (): void => {
        if (this.sidebar) {
          this.sidebar.toggle();
        }
      }
    );

    this.systemService.fetch();
  }

  ngOnDestroy():void {
    this.automaticSigninSubscription.unsubscribe();

    this.sidebarSubscription.unsubscribe();
  }

}
