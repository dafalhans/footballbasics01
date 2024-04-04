import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {teamManager} from "../team.manager";
import {teamModel} from "../team.model";
import {JsonPipe} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-team-sidebar-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    JsonPipe,
    CalendarModule,
    RippleModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatCardTitle,
    MatButton,
    MatCardModule,
    MatButtonModule,
  ],
  // providers: [
  //   DialogService,
  //   ConfirmationService,
  //   MessageService
  // ],
  templateUrl: './team-sidebar-details.component.html',
  styleUrl: './team-sidebar-details.component.css',
  encapsulation: ViewEncapsulation.None // primeng styling voor dit standalone component
})
export class teamSidebarDetailsComponent implements OnInit {

  public readonly teamFields = teamFields;

  teamForm!: FormGroup<teamFormType>;
  @Input() selectedTeam!: teamModel | undefined;

  // constructor(private fb: FormBuilder,
  //             private dialogRef: DynamicDialogRef,
  //             protected config: DynamicDialogConfig,
  //             private teamManager: teamManager) {
  // }

  constructor(
              private teamManager: teamManager) {
  }




  ngOnInit(): void {
  }



}

enum teamFields {
  Id = 'id',
  Name = 'name',
  TeamName = 'teamName',
  Location = 'location',
  Stadium = 'stadiumName',
  TeamLogo = 'teamLogoImageData'
}





interface teamFormType {
  [teamFields.Id]: FormControl<string | null>;
  [teamFields.Name]: FormControl<string | null>;
  [teamFields.TeamName]: FormControl<string | null>;
  [teamFields.Location]: FormControl<string | null>;
  [teamFields.Stadium]: FormControl<string | null>;
  [teamFields.TeamLogo]: FormControl<string | null>;
}

