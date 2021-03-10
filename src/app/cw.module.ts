import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { SidebarComponent } from './sidebar/sidebar.component';
import { SystemComponent } from './sidebar/system/system.component';
import { DelayedInputDirective } from './shared/directives/delayed-input.directive';
import { PlayerCardComponent } from './players/player-card/player-card.component';
import { CharacterDetailComponent } from './characters/character-detail/character-detail.component';

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
    SidebarComponent,
    SystemComponent,
    DelayedInputDirective,
    PlayerCardComponent,
    CharacterDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
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
