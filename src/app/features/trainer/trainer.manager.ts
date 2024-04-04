import {Injectable} from '@angular/core';
import {trainerService} from "./trainer.service";
import {BehaviorSubject} from "rxjs";
import {trainerModel} from "./trainer.model";

@Injectable({
  providedIn: 'root'
})
export class trainerManager {

  all$ = new BehaviorSubject<trainerModel[]>([]);
  current$ = new BehaviorSubject<trainerModel | null>(null);

  constructor(private trainerService: trainerService) {
  }

  getAll() {
    this.trainerService.getAll()
      .subscribe((data: trainerModel[]) => this.all$.next(data));
  }

  getById(id: string) {
    this.trainerService.getById(id).subscribe((data) => this.current$.next(data));
  }

  create(model: trainerModel) {
    this.trainerService.create(model).subscribe(() => this.getAll());
  }

  update(model: trainerModel) {
    this.trainerService.update(model).subscribe(() => this.getAll());
  }

  delete(id: string) {
    this.trainerService.delete(id).subscribe(() => this.getAll());
  }

}
