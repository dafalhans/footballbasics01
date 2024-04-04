import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {playerService} from "./player.service";
import {playerManager} from "./player.manager";
import {playerModel} from "./player.model";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogService} from "primeng/dynamicdialog";
import {playerFormComponent} from "./player-form/player-form.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {playerFormUploadComponent} from "./player-form-upload/player-form-upload.component";

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
  selector: 'app-player',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    JsonPipe,
    TableModule,
    CommonModule,
    ButtonModule,
    playerFormComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    playerService,
    DialogService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class playerComponent implements OnInit {

  protected readonly CellType = CellType;

  all$ = this.playerManager.all$;
  current$ = this.playerManager.current$;

  cols!: Column[];

  showFullSizeImage = false;
  imageWidth = 50;
  imageHeight = 50;

  getRowFontSize(): number {
    return 14;
  }








  constructor(private playerManager: playerManager,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.playerManager.getAll();

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
        field: 'firstName',
        header: 'First Name',
        type: CellType.TEXT
      },
      {
        field: 'lastName',
        header: 'Last Name',
        type: CellType.TEXT
      },
      {
        field: 'birthDate',
        header: 'Birth Date',
        type: CellType.DATE
      },
      {
        field: 'weight',
        header: 'Weight',
        type: CellType.TEXT
      },
      {
        field: 'height',
        header: 'Height',
        type: CellType.TEXT
      },
      {
        field: 'basePosition',
        header: 'Base Position',
        type: CellType.TEXT
      },
      {
        field: 'shirtNumber',
        header: 'Shirt Number',
        type: CellType.TEXT
      },
      {
        field: 'nationality',
        header: 'Nationality',
        type: CellType.TEXT
      },
      {
        field: 'playerImageData',
        header: 'playerImageData',
        // type: CellType.TEXT
        type: CellType.IMAGE
      }
    ];
  }



  edit(rowData: playerModel) {
    console.log('Edit ' + rowData.id);
    // this.dialogService.open(playerFormComponent, {
    this.dialogService.open(playerFormUploadComponent, {
      header: 'Edit player',
      width: '30vw',
      data: rowData
    });
  }

  confirmedDelete(rowData: playerModel) {
    console.log('Delete ' + rowData.id);
    this.confirmationService.confirm({
      message: 'Please confirm to proceed moving forward.',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      rejectButtonStyleClass: 'p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.playerManager.delete(rowData.id!);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Deleted player id = ' + rowData.id,
          life: 3000
        });
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
      }
    });
  }

  createNew() {
    console.log('New player');
    // this.dialogService.open(playerFormComponent, {
    this.dialogService.open(playerFormUploadComponent, {
      header: 'New player',
      width: '30vw'
    });
  }

  view(rowData: playerModel) {
    console.log('View ' + rowData.id);
    this.playerManager.getById(rowData.id!);
    this.messageService.add({
      severity: 'info',
      summary: 'GetById',
      detail: 'Get player id = ' + rowData.id,
      life: 3000
    });
  }

}

