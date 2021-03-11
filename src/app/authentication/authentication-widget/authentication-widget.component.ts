import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/players/model/player.model';
import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'cw-authentication-widget',
  templateUrl: './authentication-widget.component.html',
  styleUrls: ['./authentication-widget.component.scss']
})
export class AuthenticationWidgetComponent implements OnInit, OnDestroy {

  public playerSubscription: Subscription;

  public player: Player = null;

  public loading: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.playerSubscription = this.authenticationService.playerSubject.subscribe(
      (player: Player): void => {
        this.player = player;
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.playerSubscription.unsubscribe();
  }

  public open(): void {
    const dialogRef = this.matDialog.open(AuthenticationDialogComponent);
  }

}
