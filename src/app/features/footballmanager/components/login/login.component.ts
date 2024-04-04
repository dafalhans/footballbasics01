import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenuItem} from "@angular/material/menu";
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../../../app.config";
import {NgIf} from "@angular/common";
import {AuthServiceFootBallService} from "../../../services/auth-service-foot-ball.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIcon,
    MatMenuItem,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit{

  isLoggedIn: boolean | undefined;

  constructor(
    private oauthService: OAuthService,
    private authSvc: AuthServiceFootBallService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.authSvc.UserCanEdit$.subscribe();

    this.oauthService.getIdToken();
    if(this.oauthService.hasValidIdToken()){

      this.isLoggedIn = true;
    }
    else{

      // this.isLoggedIn = false;
    }
  }

  twostapsLogin(){
    this.initializeOAuth();
    // this.authSvc.changeCanEdit(true);
    this.isLoggedIn = !this.isLoggedIn;
    // this.authSvc.getRoles();
    this.router.navigate(['/'], {relativeTo: this.route});
    this.cdr.detectChanges();
    this.authSvc.getRoles();
  }

  twostapsLogout(){
    this.authSvc.changeCanEdit(false);
    this.logout();
    this.isLoggedIn = !this.isLoggedIn;
    // this.authSvc.getRoles();
    this.cdr.detectChanges();
  }



  initializeOAuth(): void {
    this.loginCode().then(() => {
      this.authSvc.getUserData();
    });

    if(this.oauthService.hasValidIdToken()){

    }

    this.cdr.detectChanges();
  }

  async loginCode() {

    // Aanpassen config for code flow
    this.oauthService.configure(authCodeFlowConfig);
    // await this.oauthService.loadDiscoveryDocument();
    await this.oauthService.loadDiscoveryDocumentAndLogin();
    sessionStorage.setItem('flow', 'code');
    // this.oauthService.initLoginFlow('/some-state;p1=1;p2=2?p3=3&p4=4');

    this.authSvc.getUserData();

    if(this.oauthService.hasValidIdToken()){

      this.authSvc.changeCanEdit(true); // TODO waarom werkt dit niet :(

      this.cdr.detectChanges();

    }
    this.authSvc.changeCanEdit(true);

    this.cdr.detectChanges();

  }

  @Output() loginStateChanged = new EventEmitter<unknown>();

  logout() {
    this.oauthService.logOut();
    sessionStorage.clear();


    this.authSvc.changeCanEdit(false);

    if(this.oauthService.hasValidIdToken()){

    }

    this.cdr.detectChanges();

  }



}
