import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BasePositionEnum} from "../models/base-position-enum";
import {TrainerSpecialtyEnum} from "../models/trainer-specialty-enum";


@Injectable({
  providedIn: 'root'
})
export class EnumServiceService {

  private baseURI = '/api/enums'
  constructor(private http: HttpClient) { }

  getBasePositions(): Observable<BasePositionEnum[]>{
    return this.http.get<BasePositionEnum[]>(this.baseURI + '/' + "basepositions");
  }

  getTrainerSpecialties(): Observable<TrainerSpecialtyEnum[]>{
    return this.http.get<TrainerSpecialtyEnum[]>(this.baseURI + '/' + "trainerspecialties");
  }
}
