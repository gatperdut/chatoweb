import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ConfirmationComponent } from './authentication/confirmation/confirmation.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { AuthenticationResolver } from './authentication/resolvers/authentication.resolver';
import { UnlockedComponent } from './authentication/unlocked/unlocked.component';
import { CharactersComponent } from './characters/characters.component';
import { HomeComponent } from './home/home.component';
import { ItemTemplatesComponent } from './item-templates/item-templates.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'characters',
    component: CharactersComponent,
    canActivate: [
      AuthenticationGuard
    ],
    // resolve: [
    //   AuthenticationResolver
    // ]
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
    ],
    // resolve: [
    //   AuthenticationResolver
    // ]
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
