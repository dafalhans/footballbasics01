import {Injectable} from '@angular/core';
import {teamService} from "./team.service";
import {BehaviorSubject} from "rxjs";
import {teamModel} from "./team.model";

@Injectable({
  providedIn: 'root'
})
export class teamManager {

  private teamCache: { [id: string]: teamModel } = {};

  all$ = new BehaviorSubject<teamModel[]>([]);
  current$ = new BehaviorSubject<teamModel | null>(null);

  constructor(private teamService: teamService) {
  }

  getAll() {
    this.teamService.getAll()
      .subscribe((data: teamModel[]) => this.all$.next(data));
  }

  // getById(id: string) {
  //   this.teamService.getById(id).subscribe((data) => this.current$.next(data));
  // }

  getById(id: string) {
    // Check if player exists in cache
    if (this.teamCache[id]) {
      this.current$.next(this.teamCache[id]);
    } else {
      // Fetch player from service
      this.teamService.getById(id).subscribe((data) => {
        // Update cache
        this.teamCache[id] = data;
        // Update current$
        this.current$.next(data);
        console.log(data);
      });
    }
  }

  create(model: teamModel) {
    this.teamService.create(model).subscribe(() => this.getAll());
  }

  update(model: teamModel) {
    this.teamService.update(model).subscribe(() => this.getAll());
  }

  delete(id: string) {
    this.teamService.delete(id).subscribe(() => this.getAll());
  }

}
