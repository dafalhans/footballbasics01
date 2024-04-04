import {Injectable} from '@angular/core';
import {playerService} from "./player.service";
import {BehaviorSubject} from "rxjs";
import {playerModel} from "./player.model";

@Injectable({
  providedIn: 'root'
})
export class playerManager {

  all$ = new BehaviorSubject<playerModel[]>([]);
  current$ = new BehaviorSubject<playerModel | null>(null);

  constructor(private playerService: playerService) {
  }

  getAll() {
    this.playerService.getAll()
      .subscribe((data: playerModel[]) => {this.all$.next(data);console.log(data)});
  }

  getById(id: string) {
    this.playerService.getById(id).subscribe((data) => {this.current$.next(data);console.log(data)});
  }

  create(model: playerModel) {
    this.playerService.create(model).subscribe(() => this.getAll());
  }

  update(model: playerModel) {
    this.playerService.update(model).subscribe(() => this.getAll());
  }

  delete(id: string) {
    this.playerService.delete(id).subscribe(() => this.getAll());
  }

}
