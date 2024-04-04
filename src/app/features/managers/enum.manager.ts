
import {Injectable} from '@angular/core';
import {EnumServiceService} from "../services/enum-service.service";
import {BehaviorSubject} from "rxjs";
import {BasePositionEnum} from "../models/base-position-enum";
import {TrainerSpecialtyEnum} from "../models/trainer-specialty-enum";

@Injectable({
  providedIn: 'root'
})
export class EnumManager {

  allBasePositionEnums$ = new BehaviorSubject<BasePositionEnum[]>([]);
  allTrainerSpecialtyEnums$ = new BehaviorSubject<TrainerSpecialtyEnum[]>([]);

  constructor(private enumService: EnumServiceService) {
  }

  getAllBasePositionEnums() {
    this.enumService.getBasePositions()
      .subscribe((data: BasePositionEnum[]) => {
        this.allBasePositionEnums$.next(data);
        console.log(data)
      });
  }

  getAllTrainerSpecialtyEnums() {
    this.enumService.getTrainerSpecialties()
      .subscribe((data: TrainerSpecialtyEnum[]) => {
        this.allTrainerSpecialtyEnums$.next(data);
        console.log(data)
      });
  }



}
