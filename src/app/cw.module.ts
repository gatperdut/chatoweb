import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationWidgetComponent } from "./authentication/authentication-widget/authentication-widget.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { ConfirmationComponent } from "./authentication/confirmation/confirmation.component";
import { CharactersComponent } from "./characters/characters.component";
import { CwRoutingModule } from "./cw-routing.module";
import { CwComponent } from "./cw.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ItemTemplatesComponent } from "./item-templates/item-templates.component";
import { PlayersComponent } from "./players/players.component";
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { UnlockedComponent } from './authentication/unlocked/unlocked.component';
import { AuthenticationInterceptor } from "./authentication/interceptors/authentication.interceptor";
import { SystemComponent } from './system/system.component';
import { DelayedInputDirective } from './shared/directives/delayed-input.directive';
import { PlayerCardComponent } from './players/player-card/player-card.component';
import { CharacterDetailComponent } from './characters/character-detail/character-detail.component';
import { AuthenticationDialogComponent } from './authentication/authentication-dialog/authentication-dialog.component';

@NgModule({
  declarations: [
    CwComponent,
    HeaderComponent,
    CharactersComponent,
    ItemTemplatesComponent,
    HomeComponent,
    PlayersComponent,
    AuthenticationComponent,
    AuthenticationWidgetComponent,
    ConfirmationComponent,
    PasswordResetComponent,
    UnlockedComponent,
    SystemComponent,
    DelayedInputDirective,
    PlayerCardComponent,
    CharacterDetailComponent,
    AuthenticationDialogComponent
  ],
  entryComponents: [
    AuthenticationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Material
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    // NgBootstrap
    NgbModule,
    // ChatoWeb
    CwRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    CwComponent
  ],
  exports: [

  ]
})
export class CwModule {

}
