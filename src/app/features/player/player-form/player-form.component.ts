import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {playerManager} from "../player.manager";
import {playerModel} from "../player.model";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {ArrowRightIcon} from "primeng/icons/arrowright";
import {BasePositionEnum} from "../../models/base-position-enum";
import {EnumServiceService} from "../../services/enum-service.service"
import {DropdownModule} from "primeng/dropdown";
import {BehaviorSubject} from "rxjs";
import {EnumManager} from "../../managers/enum.manager";



@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    JsonPipe,
    CalendarModule,
    RippleModule,
    DropdownModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css'
})
export class playerFormComponent implements OnInit {

  public readonly playerFields = playerFields;
  calendarDateFormat = 'yy-mm-dd';


  playerForm!: FormGroup<playerFormType>;

  // basePositions: BasePositionEnum[] = [];


  // basePositions$: BehaviorSubject<BasePositionEnum[]> = new BehaviorSubject<BasePositionEnum[]>([])
  basePositions$ =  this.enumManager.allBasePositionEnums$;

  constructor(private fb: FormBuilder,
              private dialogRef: DynamicDialogRef,
              protected config: DynamicDialogConfig,
              private playerManager: playerManager,
              private enumManager: EnumManager,
              private enumService: EnumServiceService) {
  }

  ngOnInit(): void {

    // this.enumManager.getAllBasePositionEnums();

    // this.enumService.getBasePositions().subscribe(positions => {
    //   // console.log(positions)
    //   this.basePositions = positions;
    //   // this.basePositions$ = positions.map(position => ({ label: position, value: position }));
    //
    // });


    this.playerForm = this.fb.group<playerFormType>(<playerFormType>{
      // [playerFields.Id]: this.fb.control({value: '', disabled: !!this.config.data}, Validators.required),
      [playerFields.Id]: this.fb.control({value: '', disabled: true}),
      [playerFields.Name]: this.fb.control(''),
      [playerFields.FirstName]: this.fb.control(''),
      [playerFields.LastName]: this.fb.control(''),
      [playerFields.BasePosition]: this.fb.control(''),
      [playerFields.Birthdate]: this.fb.control(''),
      [playerFields.ShirtNumber]: this.fb.control(''),
      [playerFields.Weight]: this.fb.control(''),
      [playerFields.Height]: this.fb.control('')
    });

    // const birthDateValue = this.config.data.birthDate ? new Date(this.config.data.birthDate) : new Date();
    // this.playerForm.get(playerFields.Birthdate)?.setValue(birthDateValue);

    this.playerForm.patchValue(this.config.data);
  }

  save() {
    console.log(this.playerForm.getRawValue())
    let model: playerModel = this.playerForm.getRawValue();
    if (this.config.data) {
      this.playerManager.update(model);
    } else {
      this.playerManager.create(model);
    }
    this.dialogRef.close();
  }



  // getPlayerBirthdate(): Date {
  //   const birthdateControl = this.playerForm.get(playerFields.Birthdate);
  //   if (birthdateControl && birthdateControl.value) {
  //     const birthdate = new Date(birthdateControl.value);
  //     return isNaN(birthdate.getTime()) ? new Date() : birthdate; // If the value is not a valid date, return the current date
  //   }
  //   return new Date(); // Return the current date if birthdate control is not available or has no value
  // }

}

enum playerFields {
  Id = 'id',
  Name = 'name',
  FirstName = 'firstName',
  LastName = 'lastName',
  Birthdate = 'birthDate',
  Weight = 'weight',
  Height = 'height',
  ShirtNumber = 'shirtNumber',
  BasePosition = 'basePosition'
}

interface playerFormType {
  [playerFields.Id]: FormControl<string | null>;
  [playerFields.Name]: FormControl<string | null>;
  [playerFields.FirstName]: FormControl<string | null>;
  [playerFields.LastName]: FormControl<string | null>;
  [playerFields.Birthdate]: FormControl<Date | null>;
  [playerFields.Weight]: FormControl<string | null>;
  [playerFields.Height]: FormControl<string | null>;
  [playerFields.ShirtNumber]: FormControl<string | null>;
  [playerFields.BasePosition]: FormControl<string | null>;
}




