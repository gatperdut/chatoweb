import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ConfirmationComponent } from './authentication/confirmation/confirmation.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { AutomaticAuthenticationGuard } from './authentication/guards/automatic-authentication.guard';
import { UnlockedComponent } from './authentication/unlocked/unlocked.component';
import { CharacterDetailComponent } from './characters/character-detail/character-detail.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterResolver } from './characters/resolvers/character.resolver';
import { HomeComponent } from './home/home.component';
import { ItemTemplatesComponent } from './item-templates/item-templates.component';
import { PlayersComponent } from './players/players.component';
import { MapComponent } from './map/map.component';
import { RoomsResolver } from './rooms/resolvers/rooms.resolver';
import { DoorsResolver } from './rooms/resolvers/doors.resolver';

const routes: Routes = [
  {
    path: '',
    canActivate: [
      AutomaticAuthenticationGuard
    ],
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'characters',
        canActivate: [
          AuthenticationGuard
        ],
        children: [
          {
            path: '',
            component: CharactersComponent,
            pathMatch: 'full'
          },
          {
            path: ':id',
            component: CharacterDetailComponent,
            resolve: {
              character: CharacterResolver
            }
          }
        ]
      },
      {
        path: 'item-templates',
        component: ItemTemplatesComponent
      },
      {
        path: 'players',
        component: PlayersComponent,
        canActivate: [
          AuthenticationGuard
        ]
      },
      {
        path: 'map',
        component: MapComponent,
        canActivate: [
          AuthenticationGuard
        ],
        resolve: {
          rooms: RoomsResolver,
          doors: DoorsResolver
        }
      },
      {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
          {
            path: '',
            redirectTo: 'signin',
            pathMatch: 'full'
          },
          {
            path: 'confirmation',
            component: ConfirmationComponent
          },
          {
            path: 'password-reset',
            component: PasswordResetComponent
          },
          {
            path: 'unlocked',
            component: UnlockedComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CwRoutingModule { }
