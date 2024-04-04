import {Injectable} from '@angular/core';
import {countryService} from "./country.service";
import {BehaviorSubject, Observable} from "rxjs";
import {countryModel} from "./country.model";

@Injectable({
  providedIn: 'root'
})
export class countryManager {

  all$ = new BehaviorSubject<countryModel[]>([]);
  current$ = new BehaviorSubject<countryModel | null>(null);

  constructor(private countryService: countryService) {
  }

  getById2(id: string): Observable<countryModel> {

    console.log(this.countryService.getById(id).subscribe((data) => console.log("from getbyid2 " + data.capital)));
    return this.countryService.getById(id);


  }

}
