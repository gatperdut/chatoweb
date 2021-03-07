import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/services/sidebar.service';

@Component({
  selector: 'cw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService
  ) {

  }

  ngOnInit(): void {

  }

}
