import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {Direction} from "@angular/cdk/bidi";
import {MatAccordion} from "@angular/material/expansion";
import {playerComponent} from "../../../player/player.component";
import {teamComponent} from "../../../team/team.component";
import {trainerComponent} from "../../../trainer/trainer.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {SidenavcontentlistComponent} from "../sidenavcontentlist/sidenavcontentlist.component";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthServiceFootBallService} from "../../../services/auth-service-foot-ball.service";
import {OAuthService} from "angular-oauth2-oidc";

const SMALL_WIDTH_BREAKPOINT = 720;




@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatNavList,
    MatToolbar,
    MatSidenavContainer,
    RouterOutlet,
    ToolbarComponent,
    MatSidenav,
    MatSidenavModule,
    MatAccordion,
    MatListItem,
    playerComponent,
    teamComponent,
    trainerComponent,
    NgIf,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatMenuTrigger,
    SidenavcontentlistComponent,
    AsyncPipe
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SidenavComponent implements OnInit {


  public isScreenSmall: boolean = false;
  selectedOption: string = 'Teams';
  isDarkTheme: boolean = false;
  dir: Direction = 'ltr';


  constructor(
    private breakpointObserver: BreakpointObserver,
    private AuthSvc: AuthServiceFootBallService,
    private cdr: ChangeDetectorRef,
    private oauthService: OAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;



  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.cdr.detectChanges();
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  selectOption(option: string) {

    console.log("whats the option here for players? : " + option);
    this.selectedOption = option;
    // this.cdr.detectChanges();
    if(option == 'Players'){
      console.log("wkom ik hier? : " + option);
      const location = "playermanager/playerswithnationality"
      this.router.navigate([location]);
    }else{
      this.router.navigate([option.toLowerCase()], {relativeTo: this.route});
    }

  }

  ngOnInit(): void {

    this.AuthSvc.getThemePreference().subscribe(theme => {
      if (theme === 'dark') {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    });

    this.cdr.detectChanges();

  }



}
