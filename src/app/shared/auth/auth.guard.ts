// import { CanActivateFn } from '@angular/router';
//
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private oauthService: OAuthService) {}

  canActivate() {
    console.log("in the guard code?")
    if (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    ) {
      return true;
    } else {
      console.log("in the guard code else statement");
      this.router.navigate(['/home', { login: true }]);
      return false;
    }
  }
}
