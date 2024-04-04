// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
//
// import { routes } from './app.routes';
//
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes)]
// };

import {APP_INITIALIZER, ApplicationConfig, inject} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS, HttpEvent, HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors
} from "@angular/common/http";
import {AuthConfig, OAuthService, provideOAuthClient} from "angular-oauth2-oidc";
import {provideAnimations} from "@angular/platform-browser/animations";
import {Observable} from "rxjs";


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://keycloak.ozcorp.com:8080/realms/myrealm',
  tokenEndpoint: 'http://keycloak.ozcorp.com:8080/realms/myrealm/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'secfocus',
  responseType: 'code',
  scope: 'openid profile',
  // scope: 'openid profile email offline_access profile api',
  requireHttps: false
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const oAuthService = inject(OAuthService);
  const token = 'Bearer ' + oAuthService.getAccessToken();
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        authorization: token,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};

function initializeOAuth(oAuthService: OAuthService): Promise<void>{
  return new Promise((resolve) => {
    oAuthService.configure(authCodeFlowConfig);
    oAuthService.setupAutomaticSilentRefresh();
    oAuthService.loadDiscoveryDocumentAndLogin() //loading config json from Keycloak
      .then(() => resolve())
  })
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () =>
          initializeOAuth(oauthService);
      },
      multi: true,
      deps: [
        OAuthService
      ]
    }
  ]
};
