import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {trainerModel} from "./trainer.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class trainerService {

  private baseURI = '/api/trainers'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<trainerModel[]> {
    return this.http.get<trainerModel[]>(this.baseURI);
  }

  getById(id: string): Observable<trainerModel> {
    return this.http.get<trainerModel>(this.baseURI + '/' + id);
  }

  create(model: trainerModel): Observable<trainerModel> {
    return this.http.post<trainerModel>(this.baseURI, model);
  }

  update(model: trainerModel): Observable<trainerModel> {
    return this.http.put<trainerModel>(this.baseURI, model);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseURI + '/' + id);
  }
}
