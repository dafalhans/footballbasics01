import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {MatTabGroup} from "@angular/material/tabs";
import {ActivatedRoute} from "@angular/router";
// import {playerManager} from "../player.manager";
import {playerManager} from "../../player-country/player.manager";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {map, Observable, of} from "rxjs";
import {playerModel} from "../player.model";
import {MatCell} from "@angular/material/table";
import {countryComponent} from "../../country/country.component";

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinner,
    MatCard,
    MatCardHeader,
    DatePipe,
    MatCardContent,
    MatTabGroup,
    AsyncPipe,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatCardTitle,
    MatButton,
    MatCardModule,
    MatButtonModule,
    MatCell,
    countryComponent,
    NgForOf,
  ],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit {

  // players$ = this.playerManager.subset$;
  currentPlayer$= this.playerManager.current$;

  playerNationality:string | null | undefined = '';

  @Input() playerKey!: string

  @Output() nationalityChanged: EventEmitter<string> = new EventEmitter<string>();

  retrieveNationality() {
    // const nationality = 'BEL';
    const nationality  = this.currentPlayer$.getValue()?.nationality;
    // @ts-ignore
    this.nationalityChanged.emit(nationality);
  }

  // @Input({transform: (value: string | undefined): string =>{}}) playerKey!: string;

  constructor(
    private route: ActivatedRoute,
    private playerManager: playerManager) {
  }

  ngOnInit(): void {



    this.playerManager.getById(this.playerKey.toString());
    this.playerManager.getAll();

    // this.player$ = this.playerManager.current$.pipe(
    //   map(players => players.find(player => player.id === +this.playerKey))
    // );
  }


}



//   ngOnInit(): void {
//
//     this.route.params.subscribe(params => {
//       let id = params['id'];
//       if (!id) id = 1;
//       // this.current$ = this.teamManager.current$;
//
//       this.teamManager.getById(id);
//
// }
