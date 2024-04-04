import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {trainerService} from "./trainer.service";
import {trainerManager} from "./trainer.manager";
import {trainerModel} from "./trainer.model";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogService} from "primeng/dynamicdialog";
import {trainerFormComponent} from "./trainer-form/trainer-form.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

interface Column {
  field: string,
  header: string,
  type: CellType,
}

enum CellType {
  TEXT,
  DATE
}

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    JsonPipe,
    TableModule,
    CommonModule,
    ButtonModule,
    trainerFormComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    trainerService,
    DialogService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css'
})
export class trainerComponent implements OnInit {

  protected readonly CellType = CellType;

  all$ = this.trainerManager.all$;
  current$ = this.trainerManager.current$;

  cols!: Column[];

  constructor(private trainerManager: trainerManager,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.trainerManager.getAll();

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
        field: 'trainerSpecialty',
        header: 'Trainer Specialty',
        type: CellType.TEXT
      }
    ];
  }

  edit(rowData: trainerModel) {
    console.log('Edit ' + rowData.id);
    this.dialogService.open(trainerFormComponent, {
      header: 'Edit trainer',
      width: '30vw',
      data: rowData
    });
  }

  confirmedDelete(rowData: trainerModel) {
    console.log('Delete ' + rowData.id);
    this.confirmationService.confirm({
      message: 'Please confirm to proceed moving forward.',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      rejectButtonStyleClass: 'p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.trainerManager.delete(rowData.id!);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Deleted trainer id = ' + rowData.id,
          life: 3000
        });
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
      }
    });
  }

  createNew() {
    console.log('New trainer');
    this.dialogService.open(trainerFormComponent, {
      header: 'New trainer',
      width: '30vw'
    });
  }

  view(rowData: trainerModel) {
    console.log('View ' + rowData.id);
    this.trainerManager.getById(rowData.id!);
    this.messageService.add({
      severity: 'info',
      summary: 'GetById',
      detail: 'Get trainer id = ' + rowData.id,
      life: 3000
    });
  }

}

