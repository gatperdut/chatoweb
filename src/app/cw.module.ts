import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { FlexLayoutModule } from "@angular/flex-layout";
import { CharacterAttributesComponent } from './characters/character-detail/character-attributes/character-attributes.component';
import { SignPipe } from "./shared/pipes/sign.pipe";
import { CharacterSkillsComponent } from './characters/character-detail/character-skills/character-skills.component';
import { MapComponent } from './map/map.component';
import { MapControlsComponent } from './map/map-controls/map-controls.component';
import { RoomControlsComponent } from './map/room-controls/room-controls.component';
import { RoomDetailComponent } from './rooms/room-detail/room-detail.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { DoorDetailComponent } from './rooms/door-detail/door-detail.component';
import { DoorControlsComponent } from './map/door-controls/door-controls.component';
import { WeaponStatTemplateFormComponent } from "./item-templates/item-template-form/weapon-stat-template-form/weapon-stat-template-form.component";
import { MeleeStatTemplateFormComponent } from "./item-templates/item-template-form/weapon-stat-template-form/melee-stat-template-form/melee-stat-template-form.component";
import { RangedStatTemplateFormComponent } from "./item-templates/item-template-form/weapon-stat-template-form/ranged-stat-template-form/ranged-stat-template-form.component";
import { ItemTemplateFormComponent } from './item-templates/item-template-form/item-template-form.component';

@NgModule({
  declarations: [
    // Components
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
    PlayerCardComponent,
    CharacterDetailComponent,
    AuthenticationDialogComponent,
    CharacterAttributesComponent,
    CharacterSkillsComponent,
    MapComponent,
    MapControlsComponent,
    RoomControlsComponent,
    RoomDetailComponent,
    SnackBarComponent,
    DoorDetailComponent,
    DoorControlsComponent,
    WeaponStatTemplateFormComponent,
    MeleeStatTemplateFormComponent,
    RangedStatTemplateFormComponent,
    // Directives
    DelayedInputDirective,
    // Pipes
    SignPipe,
    ItemTemplateFormComponent
  ],
  entryComponents: [
    AuthenticationDialogComponent,
    RoomDetailComponent,
    DoorDetailComponent,
    ItemTemplateFormComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Angular/Flex-Layout
    FlexLayoutModule,
    // Angular/Material
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    // CDK
    ClipboardModule,
    DragDropModule,
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
