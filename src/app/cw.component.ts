import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/services/authentication.service';
import { SystemService } from './sidebar/system/services/system.service';

@Component({
  selector: 'cw-root',
  templateUrl: './cw.component.html',
  styleUrls: ['./cw.component.scss']
})
export class CwComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private systemService: SystemService
  ) {

  }

  ngOnInit(): void {
    this.authenticationService.automaticSignin();

    this.systemService.fetch();
  }

}
