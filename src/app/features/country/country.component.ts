import {Component, Input, OnInit, signal} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {countryService} from "./country.service";
import {countryManager} from "./country.manager";
import {countryModel} from "./country.model";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

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
  selector: 'app-country',
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
    DialogModule,
    MatProgressSpinner
  ],
  providers: [
    countryService,
    DialogService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class countryComponent implements OnInit {

  protected readonly CellType = CellType;

  // all$ = this.countryManager.all$;
  current$ = this.countryManager.current$;

  showCountry?: countryModel;

  // selectedCountry: string = '';  //TODO moet dit zo?


  @Input() country!: string;
  showOverlay = false;

  constructor(private countryManager: countryManager,
              private messageService: MessageService) {
  }

  ngOnInit(): void {

    console.log("komen we elke keer hierlangs?");
    this.countryManager.getById2(this.country).subscribe((data) => console.log("from ngOnInit " + data.currency ));
    this.countryManager.getById2(this.country).subscribe((data) => {this.showCountry = data});

    // this.country = '';
    // this.selectedCountry = ''; //TODO moet dit zo?
  }

  visible: boolean = false;

  position: string = 'bottomright';



  showDialog() {
    this.visible = true;
    console.log(this.visible)
  }


  blah() {
    this.visible = false;
    console.log(this.visible)
  }
}

