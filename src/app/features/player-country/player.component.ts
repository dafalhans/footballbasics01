import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {playerService} from "./player.service";
import {playerManager} from "./player.manager";
import {playerModel} from "./player.model";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogService} from "primeng/dynamicdialog";

import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {countryComponent} from "../country/country.component";


interface Column {
  field: string,
  header: string,
  type: CellType,
}

enum CellType {
  TEXT,
  DATE,
  IMAGE,
  COMPONENT
}

@Component({
  selector: 'app-player-country',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    JsonPipe,
    TableModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    countryComponent
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
export class playerCountryComponent implements OnInit {

  protected readonly CellType = CellType;

  all$ = this.playerManager.all$;
  current$ = this.playerManager.current$;

  cols!: Column[];

  showFullSizeImage = false;
  imageWidth = 50;
  imageHeight = 50;




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
      },
      {
        field: 'nationality',
        header: 'Nationality',
        type: CellType.COMPONENT,
      },
    ];
  }









}

