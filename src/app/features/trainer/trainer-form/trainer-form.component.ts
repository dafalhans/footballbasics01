import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {trainerManager} from "../trainer.manager";
import {trainerModel} from "../trainer.model";
import {JsonPipe} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {TrainerSpecialtyEnum} from "../../models/trainer-specialty-enum";
import {EnumServiceService} from "../../services/enum-service.service";
import {EnumManager} from "../../managers/enum.manager";


@Component({
  selector: 'app-trainer-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    JsonPipe,
    CalendarModule,
    RippleModule,
    DropdownModule
  ],
  templateUrl: './trainer-form.component.html',
  styleUrl: './trainer-form.component.css'
})
export class trainerFormComponent implements OnInit {

  public readonly trainerFields = trainerFields;
  calendarDateFormat = 'yy-mm-dd';





  trainerForm!: FormGroup<trainerFormType>;
  // trainerSpecialties: TrainerSpecialtyEnum[] = [];

  trainerSpecialties$ =  this.enumManager.allTrainerSpecialtyEnums$;


  constructor(private fb: FormBuilder,
              private dialogRef: DynamicDialogRef,
              protected config: DynamicDialogConfig,
              private trainerManager: trainerManager,
              private enumManager: EnumManager,
              private enumService: EnumServiceService) {
  }

  ngOnInit(): void {

    // this.enumService.getTrainerSpecialties().subscribe(specialties => {
    //
    //   this.trainerSpecialties = specialties;
    //
    //
    // });


    this.trainerForm = this.fb.group<trainerFormType>(<trainerFormType>{
      // [trainerFields.Id]: this.fb.control({value: '', disabled: !!this.config.data}, Validators.required),
      [trainerFields.Id]: this.fb.control({value: '', disabled: true}),
      [trainerFields.Name]: this.fb.control(''),
      [trainerFields.FirstName]: this.fb.control(''),
      [trainerFields.LastName]: this.fb.control(''),
      [trainerFields.TrainerSpecialty]: this.fb.control(''),
      [trainerFields.Birthdate]: this.fb.control('')

    });

    this.trainerForm.patchValue(this.config.data);
  }

  save() {
    console.log(this.trainerForm.getRawValue())
    let model: trainerModel = this.trainerForm.getRawValue();
    if (this.config.data) {
      this.trainerManager.update(model);
    } else {
      this.trainerManager.create(model);
    }
    this.dialogRef.close();
  }

}

enum trainerFields {
  Id = 'id',
  Name = 'name',
  FirstName = 'firstName',
  LastName = 'lastName',
  Birthdate = 'birthDate',
  TrainerSpecialty = 'trainerSpecialty'
}

interface trainerFormType {
  [trainerFields.Id]: FormControl<string | null>;
  [trainerFields.Name]: FormControl<string | null>;
  [trainerFields.FirstName]: FormControl<string | null>;
  [trainerFields.LastName]: FormControl<string | null>;
  [trainerFields.Birthdate]: FormControl<Date | null>;
  [trainerFields.TrainerSpecialty]: FormControl<string | null>;
}

