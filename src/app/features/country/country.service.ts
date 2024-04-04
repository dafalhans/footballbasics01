import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {countryModel} from "./country.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class countryService {

  private baseURI = '/api/countries'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<countryModel[]> {
    return this.http.get<countryModel[]>(this.baseURI);
  }

  getById(id: string): Observable<countryModel> {
    return this.http.get<countryModel>(this.baseURI + '/' + id);
  }
}
