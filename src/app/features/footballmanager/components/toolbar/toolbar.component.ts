import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {playerComponent} from "../../../player/player.component";
import {teamComponent} from "../../../team/team.component";
import {trainerComponent} from "../../../trainer/trainer.component";
import {playerService} from "../../../player/player.service";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {LoginComponent} from "../login/login.component";
import {ProfileComponent} from "../../profile/profile.component";
import {OAuthService} from "angular-oauth2-oidc";
import {playerCountryComponent} from "../../../player-country/player.component";
import {AuthServiceFootBallService} from "../../../services/auth-service-foot-ball.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatButton,
    MatMenuItem,
    NgIf,
    playerComponent,
    teamComponent,
    trainerComponent,
    LoginComponent,
    ProfileComponent,
    playerCountryComponent,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
// export class ToolbarComponent implements OnInit, OnDestroy {
  export class ToolbarComponent implements OnInit{

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();

  @Input() selectedOption!: string;

  @Output() preferenceTheme = new EventEmitter<void>();



  //  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;
  // UserCanEdit$ = this.authSvc.UserCanEdit$;
  canUserEdit: boolean | undefined;
  // canUserEdit2$ = this.authSvc.UserCanEdit$;
  userCanEditSubscription: Subscription | undefined;

  private UserRules: any;



  constructor(
    private oauthService: OAuthService,
    private authSvc: AuthServiceFootBallService
  ) { }

  ngOnInit(): void {
    // this.userCanEditSubscription = this.authSvc.UserCanEdit$.subscribe(canEdit => {
    //   console.log('whats happenening here ?' + canEdit);
    //   if(canEdit != undefined){
    //     this.canUserEdit = canEdit;
    //   }
    // });
  }

  // ngOnDestroy(): void {
  //   // @ts-ignore
  //   // this.userCanEditSubscription.unsubscribe();
  // }


  handleLoginStateChanged() {
    // console.log("Login state changed event received. ");
    // console.log(this.preference + " ------------- ")
    window.location.reload();
  }


  get givenName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get familyName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['family_name'];
  }

  get themePreference() {
    // var claims = this.oauthService.getIdentityClaims();
    // if (!claims) return null;
    // return claims['family_name'];
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['themepreference'];
  }

  // get getRoles() {
  //   // var claims = this.oauthService.getIdentityClaims();
  //   // if (!claims) return null;
  //   // return claims['family_name'];
  //   var claims = this.oauthService.getIdentityClaims();
  //   if (!claims) return null;
  //   this.UserRules = claims['groups'];
  //   console.log("setting the this.UserRoles : " + this.UserRules);
  //   return claims['groups'];
  // }

}
