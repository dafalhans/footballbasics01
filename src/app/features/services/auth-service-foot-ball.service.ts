import {ChangeDetectorRef, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";
import {BasePositionEnum} from "../models/base-position-enum";

interface UserProfile {
  username: string;
  email: string;
  themepreference: string;
  groups: string[];
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceFootBallService implements OnInit{

  // private _loginSuccess$ = new Subject<boolean>();
  // private _userProfile$ = new BehaviorSubject<UserProfile | undefined>(undefined);
  // UserCanEdit$ = new Subject<boolean>();
  // UserCanEdit$ = new BehaviorSubject<boolean| undefined>(undefined);
  canEdit: boolean;
  canEdit$ = new BehaviorSubject<boolean>(false);

  constructor(private oauthService: OAuthService) {
    this.canEdit = false;

  }


  changeCanEdit(allowed: boolean){
    console.log("changeCanEdit() -  changeCanEdit(allowed: boolean) " + allowed);
    if (!this.canEdit && allowed){
      console.log("changeCanEdit() - if (!this.canEdit && allowed)");
      this.canEdit = true;
    }else if(this.canEdit && allowed){
      console.log("changeCanEdit() - else if(this.canEdit && allowed");
      this.canEdit = true;
    }else if(this.canEdit && !allowed) {
      console.log("changeCanEdit() - else if(this.canEdit && !allowed)");
      this.canEdit = false;
    }else{
      console.log("changeCanEdit() - else ");
      this.canEdit = false;
    }
  }

  // public get loginSuccess(): Observable<boolean> {
  //   return this._loginSuccess$;
  // }
  //
  // public get userProfile(): Observable<UserProfile | undefined> {
  //   return this._userProfile$;
  // }

  // public login(username: string) {
  //
  //   this._loginSuccess$.subscribe();
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => this._loginSuccess$.next(true));
  // }

  // public loginDummy() {
  //   this.UserCanEdit$.next(true);
  //   // this._loginSuccess$.subscribe();
  //   // this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => this._loginSuccess$.next(true));
  // }

    //   next: (userData) => {
    //     this._loginSuccess$.next(true);
    //     this._userProfile$.next(userData)
    //   },
    //   error: () => this._loginSuccess$.next(false)
    // });


  // logout() {
  //   this.oauthService.logOut();
  //   // this.UserCanEdit$.next(false);
  //   sessionStorage.clear();
  //   console.log("logout vanuit mijn authSvc");
  //
  //
  // }




    // UserCanEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  private _themePreference: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  // private UserAuthGroups: any;


  get givenThemePreference() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['themepreference'];
  }

  getUserData() {
    this.setThemePreference(this.givenThemePreference);
  }

  setThemePreference(theme: string): void {
    this._themePreference.next(theme);
  }

  getThemePreference(): Observable<string | null> {
    return this._themePreference.asObservable();
  }

  getRoles() {
    // var claims = this.oauthService.getIdentityClaims();
    // if (!claims) return null;
    // return claims['family_name'];
    var claims = this.oauthService.getIdentityClaims();
    console.log("getting the claims : " + claims);
    // this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => this._loginSuccess$.next(true));
    // this.UserCanEdit$.next(true) // TODO Hans hack want claims leeg - whats up met de  this.oauthService.getIdentityClaims(); ??
    if (!claims) return null;
    console.log("getting the claims['groups'] : " + claims['groups']);
    return claims['groups'];
  }



  ngOnInit(): void {

    // this.canEdit = false;
    // this.UserCanEdit$.subscribe();

    // this.getRoles();
  }


  getCanEdit() {
    var claims = this.oauthService.getIdentityClaims();
    console.log("getting the claims['groups'] : " + claims);
    console.log("getCanEdit() ????" + this.canEdit);
    return this.canEdit;
  }
}
