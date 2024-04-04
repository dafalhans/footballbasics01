import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {playerComponent} from "./features/player/player.component";
import {trainerComponent} from "./features/trainer/trainer.component";
import {EnumManager} from "./features/managers/enum.manager";
import {ImageUploadComponent} from "./features/image-upload/image-upload.component";
import {FileUploadComponent} from "./features/file-upload/file-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, playerComponent, trainerComponent, FileUploadComponent, ImageUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private enumManager: EnumManager) {
  }

  ngOnInit():void{
    this.enumManager.getAllBasePositionEnums();
    this.enumManager.getAllTrainerSpecialtyEnums();
  }

}
