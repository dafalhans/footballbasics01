import {Component, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {teamService} from "./team.service";
import {teamManager} from "./team.manager";
import {teamModel} from "./team.model";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogService} from "primeng/dynamicdialog";
import {teamFormComponent} from "./team-form/team-form.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {playerModel} from "../player/player.model";
import {AuthServiceFootBallService} from "../services/auth-service-foot-ball.service";

interface Column {
  field: string,
  header: string,
  type: CellType,
}

enum CellType {
  TEXT,
  DATE,
  IMAGE
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    JsonPipe,
    TableModule,
    CommonModule,
    ButtonModule,
    teamFormComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    teamService,
    DialogService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
  encapsulation: ViewEncapsulation.None // primeng styling voor dit standalone component
})
export class teamComponent implements OnInit {

  protected readonly CellType = CellType;

  all$ = this.teamManager.all$;
  current$ = this.teamManager.current$;

  // canEdit = this.authSvc.canEdit;
  canEdit = this.authSvc.getCanEdit();


  cols!: Column[];
  showFullSizeImage = false;
  imageWidth = 50;
  imageHeight = 50;

  constructor(private teamManager: teamManager,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private dialogService: DialogService,
              private authSvc: AuthServiceFootBallService
              ) {
  }

  ngOnInit(): void {
    this.teamManager.getAll();

    this.cols = [
      {
        field: 'id',
        header: 'ID',
        type: CellType.TEXT
      },
      {
        field: 'name',
        header: 'NAME',
        type: CellType.TEXT
      },
      {
        field: 'creationDate',
        header: 'CREATE DATE',
        type: CellType.DATE
      },
      {
        field: 'modificationDate',
        header: 'Modification DATE',
        type: CellType.DATE
      },
      {
        field: 'teamName',
        header: 'Team Name',
        type: CellType.TEXT
      },
      {
        field: 'location',
        header: 'Location',
        type: CellType.TEXT
      },
      {
        field: 'stadiumName',
        header: 'Stadium',
        type: CellType.TEXT
      },
      {
        field: 'teamLogoImageData',
        header: 'Team Logo',
        type: CellType.IMAGE
      }
    ];
  }

  //
  // teamName?: string | null;
  // location?: string | null;
  // stadiumName?: string | null;
  // teamLogoImageData?: string | null;
  // playerBasicList?: playerModel[];
  //
  // // playerNames?: { [key: number]: string } | null; // Map<Long, String>
  // playerNames?: { id: number, name: string }[] | null;  // Array of objects
  //

  edit(rowData: teamModel) {
    console.log('Edit ' + rowData.id);
    this.dialogService.open(teamFormComponent, {
      header: 'Edit team',
      width: '30vw',
      data: rowData
    });
  }

  confirmedDelete(rowData: teamModel) {
    console.log('Delete ' + rowData.id);
    this.confirmationService.confirm({
      message: 'Please confirm to proceed moving forward.',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      rejectButtonStyleClass: 'p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.teamManager.delete(rowData.id!);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Deleted team id = ' + rowData.id,
          life: 3000
        });
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
      }
    });
  }

  createNew() {
    console.log('New team');
    this.dialogService.open(teamFormComponent, {
      header: 'New team',
      width: '30vw'
    });
  }

  view(rowData: teamModel) {
    console.log('View ' + rowData.id);
    this.teamManager.getById(rowData.id!);
    this.messageService.add({
      severity: 'info',
      summary: 'GetById',
      detail: 'Get team id = ' + rowData.id,
      life: 3000
    });
  }

}

