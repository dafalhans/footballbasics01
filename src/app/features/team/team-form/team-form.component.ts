import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {teamManager} from "../team.manager";
import {teamModel} from "../team.model";
import {JsonPipe} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService} from "primeng/api";
import {ImageUploadComponent} from "../../image-upload/image-upload.component";

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    JsonPipe,
    CalendarModule,
    RippleModule,
    ImageUploadComponent
  ],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css',
  encapsulation: ViewEncapsulation.None // primeng styling voor dit standalone component
})
export class teamFormComponent implements OnInit {

  public readonly teamFields = teamFields;
  calendarDateFormat = 'yy-mm-dd';


  teamForm!: FormGroup<teamFormType>;

  constructor(private fb: FormBuilder,
              private dialogRef: DynamicDialogRef,
              protected config: DynamicDialogConfig,
              private cdr: ChangeDetectorRef,
              private teamManager: teamManager) {
  }




  ngOnInit(): void {
    this.teamForm = this.fb.group<teamFormType>(<teamFormType>{
      [teamFields.Id]: this.fb.control({value: '', disabled: true}),
      [teamFields.Name]: this.fb.control(''),
      [teamFields.TeamName]: this.fb.control(''),
      [teamFields.Location]: this.fb.control(''),
      [teamFields.Stadium]: this.fb.control(''),
      [teamFields.TeamLogo]: this.fb.control(''),
    });

    this.teamForm.patchValue(this.config.data);
  }

  save() {
    console.log(this.teamForm.getRawValue())
    let model: teamModel = this.teamForm.getRawValue();
    if (this.config.data) {
      this.teamManager.update(model);
    } else {
      this.teamManager.create(model);
    }
    this.dialogRef.close();
  }

  onImageChanged(newImageData: string) {
    this.teamForm.get(teamFields.TeamLogo)?.setValue(newImageData);
    // this.imageChanged = newImageData; // TODO: can probably be deleted
    this.cdr.detectChanges(); // Trigger change detection
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

