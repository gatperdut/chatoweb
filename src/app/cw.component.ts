import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication/services/authentication.service';
import { Player } from './players/model/player.model';
import { SidebarService } from './services/sidebar.service';
import { ConstantsService } from './shared/constants/constants.service';
import { SystemService } from './system/services/system.service';

@Component({
  selector: 'cw-root',
  templateUrl: './cw.component.html',
  styleUrls: ['./cw.component.scss']
})
export class CwComponent implements OnInit, OnDestroy {
  @ViewChild('sidebar') private sidebar: MatSidenav;

  public loading: boolean = false;

  private sidebarSubscription: Subscription;

  private automaticSigninSubscription: Subscription;

  constructor(
    private systemService: SystemService,
    private constantsService: ConstantsService,
    private authenticationService: AuthenticationService,
    private sidebarService: SidebarService
  ) {

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

    this.constantsService.fetch();
  }

  ngOnDestroy():void {
    this.automaticSigninSubscription.unsubscribe();

    this.sidebarSubscription.unsubscribe();
  }

}
