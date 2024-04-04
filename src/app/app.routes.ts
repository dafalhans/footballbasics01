import { Routes } from '@angular/router';
import {playerComponent} from "./features/player/player.component";
import {trainerComponent} from "./features/trainer/trainer.component";
import {FootballmanagerComponent} from "./features/footballmanager/footballmanager.component";
import {teamComponent} from "./features/team/team.component";
import {inject} from "@angular/core";
import {AuthGuard} from "./shared/auth/auth.guard";
import {HomeComponent} from "./features/home/home.component";

// export const routes: Routes = [];

// export const routes: Routes = [
//   {path: 'playerlist', loadChildren: () => import('./features/player/player.component').then(m => m.playerComponent)},
//   {path: 'trainerlist', loadChildren: () => import('./features/trainer/trainer.component').then(m => m.trainerComponent)},
//   {path: '**', redirectTo: 'trainerlist' }
// ];

export const routes: Routes = [
  // {path: 'home', component: HomeComponent},
  // {path: 'footballmanager', component: FootballmanagerComponent, canActivate:[() => inject(AuthGuard).canActivate()]},
  {path: 'footballmanager', component: FootballmanagerComponent, loadChildren:() => import('./features/footballmanager/footballmanager.routes').then(r => r.FOOTBALL_ROUTES)},
  {
    path: 'playermanager',loadChildren: () => import('./features/player/player.routes').then(r => r.PLAYER_ROUTES)
  },
  {path: 'playerlist', component: playerComponent},
  {path: 'teammanager', component: teamComponent},
  {path: 'trainerlist', component: trainerComponent},
  {path: '', redirectTo: 'footballmanager', pathMatch: "full"},
  {path: '**', redirectTo: 'footballmanager' }
];
