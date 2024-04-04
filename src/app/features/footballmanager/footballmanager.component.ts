import { Component } from '@angular/core';
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-footballmanager',
  standalone: true,
  imports: [
    SidenavComponent,
    MatSidenav
  ],
  templateUrl: './footballmanager.component.html',
  styleUrl: './footballmanager.component.css'
})
export class FootballmanagerComponent {

}
