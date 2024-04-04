import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {teamModel} from "./team.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class teamService {

  private baseURI = '/api/teams'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<teamModel[]> {
    return this.http.get<teamModel[]>(this.baseURI);
  }

  getById(id: string): Observable<teamModel> {
    return this.http.get<teamModel>(this.baseURI + '/' + id);
  }

  create(model: teamModel): Observable<teamModel> {
    return this.http.post<teamModel>(this.baseURI, model);
  }

  update(model: teamModel): Observable<teamModel> {
    return this.http.put<teamModel>(this.baseURI, model);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseURI + '/' + id);
  }
}
