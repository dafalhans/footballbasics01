import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {playerModel} from "./player.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class playerService {

  private baseURI = '/api/players'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<playerModel[]> {
    return this.http.get<playerModel[]>(this.baseURI);
  }

  getById(id: string): Observable<playerModel> {
    return this.http.get<playerModel>(this.baseURI + '/' + id);
  }

  create(model: playerModel): Observable<playerModel> {
    return this.http.post<playerModel>(this.baseURI, model);
  }

  update(model: playerModel): Observable<playerModel> {
    return this.http.put<playerModel>(this.baseURI, model);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseURI + '/' + id);
  }
}
