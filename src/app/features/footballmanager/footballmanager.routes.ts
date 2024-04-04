import {Routes} from "@angular/router";
import {teamComponent} from "../team/team.component";
import {trainerComponent} from "../trainer/trainer.component";
import {playerComponent} from "../player/player.component";
import {MainContentComponent} from "./components/main-content/main-content.component";
import {HomeComponent} from "../home/home.component";


export const FOOTBALL_ROUTES: Routes = [
  {path:'', component: HomeComponent},
  { path: 'teams', component: HomeComponent, children: [{ path: ':id', component: MainContentComponent}, { path: '', component: MainContentComponent}] },
  // { path: 'teams/id', component: MainContentComponent },
  { path: 'trainers', component: trainerComponent},
  { path: 'players', component: playerComponent},
  { path: '**', component: MainContentComponent}
]
