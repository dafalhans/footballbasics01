import {Component, Input, OnInit} from '@angular/core';
import {MatListItem, MatNavList} from "@angular/material/list";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {teamManager} from "../../../team/team.manager";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {playerComponent} from "../../../player/player.component";
import {teamComponent} from "../../../team/team.component";
import {trainerComponent} from "../../../trainer/trainer.component";
import {teamModel} from "../../../team/team.model";
import {teamSidebarDetailsComponent} from "../../../team/team-sidebar-details/team-sidebar-details.component";
import {RouterLink} from "@angular/router";
import {playerManager} from "../../../player/player.manager";

@Component({
  selector: 'app-sidenavcontentlist',
  standalone: true,
  imports: [
    MatListItem,
    MatNavList,
    AsyncPipe,
    NgForOf,
    NgIf,
    playerComponent,
    teamComponent,
    trainerComponent,
    teamSidebarDetailsComponent,
    RouterLink
  ],
  templateUrl: './sidenavcontentlist.component.html',
  styleUrl: './sidenavcontentlist.component.css'
})
export class SidenavcontentlistComponent implements OnInit{

  selectedTeam: teamModel | undefined;


  constructor(private teamManager: teamManager,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private dialogService: DialogService,
              private playerManager: playerManager) {
  }

  all$ = this.teamManager.all$;

  @Input() selectedOption!: string;


  selectTeam(myobject: teamModel) {

    // console.log("selected team:" + myobject.teamName);
    this.selectedTeam = myobject;


  }

  ngOnInit(): void {
    this.teamManager.getAll();
  }
}
