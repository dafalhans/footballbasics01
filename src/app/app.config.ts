// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
//
// import { routes } from './app.routes';
//
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes)]
// };

import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject} from '@angular/core';
import {ActivatedRoute, provideRouter, Router} from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS, HttpClientModule, HttpEvent, HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors
} from "@angular/common/http";
import {AuthConfig, OAuthService, provideOAuthClient} from "angular-oauth2-oidc";
import {provideAnimations} from "@angular/platform-browser/animations";
import {Observable} from "rxjs";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatNativeDateModule} from "@angular/material/core";
import {AuthGuard} from "./shared/auth/auth.guard";
import {AuthServiceFootBallService} from "./features/services/auth-service-foot-ball.service";


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://keycloak.ozcorp.com:8080/realms/myrealm',
  tokenEndpoint: 'http://keycloak.ozcorp.com:8080/realms/myrealm/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'secfocus',
  responseType: 'code',
  scope: 'openid profile themepreference',
  // scope: 'openid profile email offline_access profile api',
  requireHttps: false,
  sessionChecksEnabled: true,  //TODO HANS
  showDebugInformation: true,  //TODO HANS
  clearHashAfterLogin: true    //TODO HANS
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const oAuthService = inject(OAuthService);

  const token = 'Bearer ' + oAuthService.getAccessToken();
  // console.log('Access Token: ' +token);
  // const id_token = oAuthService.getIdToken();
  // console.log('ID Token: ' +id_token);

  // const baseUrl = 'http://localhost:3450';

  if (
    req.url.includes('/home') ||
    req.url.endsWith('.css') ||
    req.url.endsWith('.js') ||
    req.url.endsWith('.ico')
  ) {
    // console.log("Request to Angular app:", req.url);
    return next(req);
  } else {
    // console.log("External request:", req.url);
  }


  if (token && (oAuthService.getAccessToken() != null)) {
    const cloned = req.clone({
      setHeaders: {
        authorization: token,
      },
    });
    return next(cloned);
  } else {
    // console.log("no token request: ", req.url);
    return next(req);
  }
};

export function initializeOAuth(oAuthService: OAuthService): Promise<void>{
  return new Promise((resolve) => {
    oAuthService.configure(authCodeFlowConfig);
    oAuthService.setupAutomaticSilentRefresh();
    oAuthService.loadDiscoveryDocumentAndLogin() //loading config json from Keycloak
      .then(() => resolve())
  })
}

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(HttpClientModule),
//     provideHttpClient(withInterceptors([authInterceptor])),
//     importProvidersFrom(MatNativeDateModule),
//     provideAnimations(),
//     provideOAuthClient(),
//     {
//       provide: APP_INITIALIZER,
//       useFactory: (oauthService: OAuthService) => {
//         return () =>
//           initializeOAuth(oauthService);
//       },
//       multi: true,
//       deps: [
//         OAuthService
//       ]
//     }, provideAnimationsAsync()
//   ]
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(MatNativeDateModule),
    provideAnimations(),
    provideOAuthClient(),
    // Conditionally initialize OAuth based on the current route
    {
      provide: APP_INITIALIZER,
      useFactory: (router: Router, oauthService: OAuthService) => {
        return () => {
          // console.log("gvd1" + router.url);
          if (router.url == '/') {
            // console.log("gvd2");
            return Promise.resolve();
          } else {
            // console.log("gvd3");
            return initializeOAuth(oauthService);
          }
        };
      },
      multi: true,
      deps: [Router, OAuthService]
    },
    provideAnimationsAsync()
  ]
};

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(HttpClientModule),
//     provideHttpClient(withInterceptors([authInterceptor])),
//     importProvidersFrom(MatNativeDateModule),
//     provideAnimations(),
//     provideOAuthClient(),
//     // Conditionally initialize OAuth based on the current route
//     {
//       provide: APP_INITIALIZER,
//       useFactory: (router: Router, oauthService: OAuthService, route: ActivatedRoute) => {
//         return () => {
//           console.log(route.url.subscribe(c => {console.log("blah :" + c);}));
//           console.log(route.snapshot);
//           console.log("Current route: " + route.snapshot.url.join('/'));
//           if (route.snapshot.url.join('/') === '/') {
//             console.log("Root route detected. Skipping OAuth initialization.");
//             return Promise.resolve();
//           } else {
//             console.log("Initializing OAuth for the current route.");
//             return initializeOAuth(oauthService);
//           }
//         };
//       },
//       multi: true,
//       deps: [Router, OAuthService, ActivatedRoute]
//     },
//     provideAnimationsAsync()
//   ]
// };

