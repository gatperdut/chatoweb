import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/services/authentication.service';

@Component({
  selector: 'cw-root',
  templateUrl: './cw.component.html',
  styleUrls: ['./cw.component.scss']
})
export class CwComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.authenticationService.automaticSignin();
  }

}
