import {Routes} from "@angular/router";
import {playerComponent} from "./player.component";
import {playerCountryComponent} from "../player-country/player.component";

export const PLAYER_ROUTES: Routes = [
  { path: 'playerswithnationality', component: playerCountryComponent },
  { path: 'edit', component: playerComponent },
  { path: '**', component: playerCountryComponent },
  {
    path: 'players/:id',
    component: playerCountryComponent
  }
]
