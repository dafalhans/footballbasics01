import {Injectable} from '@angular/core';
import {playerService} from "./player.service";
import {BehaviorSubject} from "rxjs";
import {playerModel} from "./player.model";

@Injectable({
  providedIn: 'root'
})
export class playerManager {

  all$ = new BehaviorSubject<playerModel[]>([]);
  current$ = new BehaviorSubject<playerModel| null>(null);
  subset$ = new BehaviorSubject<playerModel[]| null>([]);

  constructor(private playerService: playerService) {
  }

  getAll() {
    this.playerService.getAll()
      .subscribe((data: playerModel[]) => {this.all$.next(data);console.log(data)});
  }

  getById(id: string) {
    this.playerService.getById(id).subscribe((data) => {this.current$.next(data);console.log(data)});
    // this.playerService.getById(id).subscribe((data) => {this.subset$.next(data)});
  }

  getByIdForTeam(id: string) {
    // const dataArray: playerModel[] = [];
    const dataArray: playerModel[] = [];
    this.playerService.getById(id).subscribe((data) => {
      // dataArray.push(data);
      // console.log("in de subscribe van getByIdForTeam: " + dataArray );
      // this.subset$.next(dataArray);
      // console.log("in de subscribe van getByIdForTeam - subset$: " + this.subset$ );
      // this.subset$.subscribe(subset => {
      //   console.log("subset$ contents: ", subset);
      // })

      this.playerService.getById(id).subscribe((data) => {
        dataArray.push(data);
        console.log("in de subscribe van getByIdForTeam: ", dataArray);

        // Emit the updated array to subset$ BehaviorSubject every time a player is fetched
        this.subset$.next(dataArray);
      });
    });



    // this.playerService.getById(id).subscribe((data) => {this.subset$.next(data)});
  }


  // getPlayersByKeys(playerKeys: string[]) {
  //   const dataArray: playerModel[] = [];
  //
  //   playerKeys.forEach(key => {
  //     this.playerService.getById(key).subscribe((player) => {
  //       dataArray.push(player);
  //       console.log("Fetched player:", player);
  //       // Emit the updated array to subset$ BehaviorSubject every time a player is fetched
  //       this.subset$.next([...dataArray]); // Emit a new array to ensure change detection
  //     });
  //   });
  // }


  // getById(id: string) {
  //   this.playerService.getById(id).subscribe((data) => {
  //     const currentPlayers = this.all$.getValue(); // Get current array of players
  //     const updatedPlayers = [...currentPlayers.filter(player => player.id !== id), data]; // Update player with the given id or add it if not exist
  //     this.subset$.next(updatedPlayers); // Update all$ BehaviorSubject with the updated array
  //     this.current$.next(data); // Update current$ BehaviorSubject with the fetched player details
  //   });
  // }

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
