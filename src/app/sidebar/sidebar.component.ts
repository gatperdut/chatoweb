import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { sidebarSlide } from './animations/sidebar-slide.animation';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'cw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarSlide]
})
export class SidebarComponent implements OnInit, OnDestroy {
  @HostBinding('@toggle') get sidebarSlide() {
    return this.open ? 'open' : 'closed';
  }

  public open: boolean = true;

  private toggleSubscription: Subscription;

  constructor(
    private sidebarService: SidebarService
  ) {

  }

  ngOnInit(): void {
    this.toggleSubscription = this.sidebarService.sidebarSubject.subscribe(
      (toggle: boolean): void => {
        this.open = toggle;
      }
    );
  }

  ngOnDestroy(): void {
    this.toggleSubscription.unsubscribe();
  }

}
