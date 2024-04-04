import {Component, OnChanges, OnDestroy, OnInit, signal, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {teamManager} from "../../../team/team.manager";
// import {playerManager} from "../../../player/player.manager";
import {playerManager} from "../../../player-country/player.manager";
import {teamModel} from "../../../team/team.model";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, DatePipe, JsonPipe, KeyValue, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {BehaviorSubject, Observable, forkJoin, map, filter, take} from "rxjs";
import {playerModel} from "../../../player/player.model";
import {PlayerDetailComponent} from "../../../player/player-detail/player-detail.component";
import {countryComponent} from "../../../country/country.component";
import {AgePipe} from "../../../../shared/utils/age.pipe"

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatCard,
    MatCardHeader,
    MatIcon,
    DatePipe,
    MatCardContent,
    MatTabGroup,
    MatTab,
    AsyncPipe,
    NgIf,
    NgForOf,
    KeyValuePipe,
    JsonPipe,
    PlayerDetailComponent,
    countryComponent,
    MatCardSubtitle,
    AgePipe
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements OnInit {

  // user: User;
  // currentTeam: teamModel;
  current$ = this.teamManager.current$;
  players$ = this.playerManager.subset$;

  currentIndex = 0;
  selectedPlayerKey: string = '';
  // selectedPlayer: KeyValue<string, string> | undefined;

  totalPlayersCount: number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamManager: teamManager,
    private playerManager: playerManager
  ) {
  }


  ngOnInit(): void {

    // this.selectedPlayerKey = '';

    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 1;
      // this.current$ = this.teamManager.current$;

      this.teamManager.getById(id);
      this.selectedPlayerKey = '';  // reset van de ngIf param die gaat bepalen of  <app-player-detail  te zien is.



  })
  }

  navigateToPlayer(index: number): void {
    this.currentIndex = index;
    const playerKey = Object.keys(this.current$.value?.playerNames || [])[index];
    if (playerKey) {

      this.selectedPlayerKey = playerKey;
      this.playerManager.getById(playerKey.toString());
      // this.selectedPlayerKey = playerKey;
    }
  }






  countPlayers2(playerNames: { id: number; name: string }[] | null): number {
    return playerNames ? playerNames.length : 0;
  }


  countPlayers(): number {
    const playerNames = this.current$.value?.playerNames;
    return playerNames ? playerNames.length : 0;
  }



  selectPlayerKey(key: string) {

    this.selectedPlayerKey = key;

  }

  nationality: string = '';
  navigateToStadium(where: string){
    this.router.navigate([where.toLowerCase()], {relativeTo: this.route});
  }

}
