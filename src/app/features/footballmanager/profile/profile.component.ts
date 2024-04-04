import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {filter, map} from "rxjs";
import {AuthServiceFootBallService} from "../../services/auth-service-foot-ball.service";
import {authCodeFlowConfig} from "../../../app.config";
import {OAuthService} from "angular-oauth2-oidc";
import {MatIcon} from "@angular/material/icon";
import {MatMenuItem} from "@angular/material/menu";
import {JsonPipe, NgIf, } from "@angular/common";

import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";

function invalidCustomError(String: StringConstructor, error: any) {
  console.log(" cusom Error : " + JSON.stringify(error));
  return new Error(" "+ 101 + ' Poging tot iets doen met een custom Error : ' + JSON.stringify(error));
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatIcon,
    MatMenuItem,
    JsonPipe,
    NgIf,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userProfile: object | undefined;
  isUserProfileVisible: boolean = true;

  canEdit = this.authSvc.canEdit;

  constructor(private authSvc: AuthServiceFootBallService,
              private oauthService: OAuthService,
  ) {

    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => this.oauthService.loadUserProfile().then((up) => (this.userProfile = up)));
    console.log(this.userProfile);
  }


  ngOnInit(): void {



    // Fetch user data initially
    this.fetchUserData();
    // try{
    // this.oauthService.loadUserProfile().then(collectedvalue => (this.userProfile = collectedvalue));
    // }catch{
    //   error("something went wrong here")
    // }finally {
    //   let token = this.oauthService.getIdToken();
    //   console.log("finally: " + token);
    // }
    try {
      this.oauthService.loadUserProfile().then(collectedvalue => (this.userProfile = collectedvalue));
    } catch (error) {
      throw invalidCustomError(String, error);
    }

  }



  fetchUserData(): void {
    this.authSvc.getUserData();
  }


  toggleUserProfileVisibility() {
    this.isUserProfileVisible = !this.isUserProfileVisible;
  }


  logoutAndRevoke() {
    this.oauthService.revokeTokenAndLogout({'id_token_hint': this.oauthService.getIdToken()});
    sessionStorage.clear();

  }


}
