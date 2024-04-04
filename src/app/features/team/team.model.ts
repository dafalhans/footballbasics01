import {playerModel} from "../player/player.model";
import {trainerModel} from "../trainer/trainer.model";

// export interface PlayerNames {
//   [key: string]: string;
// }
export class teamModel {
  id?: string | null;
  name?: string | null;
  creationDate?: Date | null;
  modificationDate?: Date | null;

  teamName?: string | null;
  location?: string | null;
  stadiumName?: string | null;
  teamLogoImageData?: string | null;
  players?: playerModel[];
  trainer?: trainerModel;

  // playerNames?: { [key: number]: string } | null; // Map<Long, String>
  playerNames?: { id: number, name: string }[] | null;  // Array of objects
  // playerNames?: PlayerNames;



}
