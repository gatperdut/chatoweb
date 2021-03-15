import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { forkJoin, Subscription } from 'rxjs';
import { AuthenticationService } from './authentication/services/authentication.service';
import { SidebarService } from './services/sidebar.service';
import { ConstantsService } from './shared/constants/services/constants.service';
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

  constructor(
    private systemService: SystemService,
    private constantsService: ConstantsService,
    private authenticationService: AuthenticationService,
    private sidebarService: SidebarService
  ) {

  }

  ngOnInit(): void {
    this.loading = true;

    forkJoin(
      [
        this.authenticationService.automaticSignin(),
        this.systemService.fetch(),
        this.constantsService.fetch()
      ]
    ).subscribe(
      (): void => {
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
  }

  ngOnDestroy():void {
    this.sidebarSubscription.unsubscribe();
  }

}
