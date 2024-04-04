import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {playerComponent} from "./features/player/player.component";
import {trainerComponent} from "./features/trainer/trainer.component";
import {EnumManager} from "./features/managers/enum.manager";
import {ImageUploadComponent} from "./features/image-upload/image-upload.component";
import {FileUploadComponent} from "./features/file-upload/file-upload.component";
import {playerCountryComponent} from "./features/player-country/player.component";
import {OAuthService, OAuthStorage} from "angular-oauth2-oidc";
// import {authCodeFlowConfig as authCodeFlowConfig} from "./app.config"
import {filter} from "rxjs";
import {authCodeFlowConfig} from "./app.config";
import {useHash} from "./flags";
import {ButtonModule} from "primeng/button";
import {HomeComponent} from "./features/home/home.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, playerComponent, trainerComponent, FileUploadComponent, ImageUploadComponent, playerComponent, playerComponent, playerComponent, playerCountryComponent, ButtonModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';





  constructor(
    private enumManager: EnumManager,
    protected oauthService: OAuthService,
    private router: Router) {

    // HANS TODO
    if (sessionStorage.getItem('flow') === 'code') {
      // console.log("configureCodeFlow aftrappen")
      this.configureCodeFlow();
    } else {
      // this.configureImplicitFlow();
      // console.log("Auth Code Flow niet gelukt")
    }

    // Automatically load user profile
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => {
        console.debug('state', this.oauthService.state);
        this.oauthService.loadUserProfile();

        const scopes = this.oauthService.getGrantedScopes();
        console.debug('scopes', scopes);
      });
  }

// HANS TODO
  private configureCodeFlow() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
      if (useHash) {
        this.router.navigate(['/']);
      }
    });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
  }

  // private configureImplicitFlow() {
  //   this.oauthService.configure(authConfig);
  //   // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  //
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
  //     if (useHash) {
  //       this.router.navigate(['/']);
  //     }
  //   });
  //
  //   // Optional
  //   // this.oauthService.setupAutomaticSilentRefresh();
  //
  //   // Display all events
  //   this.oauthService.events.subscribe((e) => {
  //     // tslint:disable-next-line:no-console
  //     console.debug('oauth/oidc event', e);
  //   });
  //
  //   this.oauthService.events
  //     .pipe(filter((e) => e.type === 'session_terminated'))
  //     .subscribe((e) => {
  //       // tslint:disable-next-line:no-console
  //       console.debug('Your session has been terminated!');
  //     });
  // }

  logout() {
    this.oauthService.logOut();
  }
  // checkRole() {
  //   this.personService.up().subscribe({
  //     next: (_up) => this.up.set(_up.message),
  //     error:(error) => {
  //       console.log(error.message);
  //       console.log(error.status);
  //       console.log(error.statusText);
  //       this.up.set(error.status + ' ' + error.statusText)
  //     }
  //   }
  //   );
  // }




// HANS TODO

  ngOnInit():void{
    this.enumManager.getAllBasePositionEnums();
    this.enumManager.getAllTrainerSpecialtyEnums();

    // const oAuthService = inject(OAuthService);
    // const id_token = oAuthService.getIdToken();
    // console.log('ID Token on Init: ' +id_token);

  }



}
