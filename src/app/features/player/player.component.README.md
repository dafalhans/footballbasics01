player

Install PrimeNG :

```
npm install primeng
```

Install PrimeIcons :

```
npm install primeicons
```

Install primeflex  :

```
npm install primeflex
```

Add to styles.css :

```
  @import '../node_modules/primeicons/primeicons.css';
  @import '../node_modules/primeng/resources/themes/saga-blue/theme.css';
  @import '../node_modules/primeng/resources/primeng.min.css';
  @import '../node_modules/primeflex/primeflex.css';
```

Add in main.ts

```
    import { bootstrapApplication } from '@angular/platform-browser';
    import { AppComponent } from './app/app.component';
    import {provideHttpClient} from "@angular/common/http";
    import {provideAnimations} from "@angular/platform-browser/animations";
    
    bootstrapApplication(AppComponent, {
      providers: [provideHttpClient(),
        provideAnimations()],
    }).catch((err) => console.error(err));
```

OR in main.ts (in case separate config):

```
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

```

Which means in app.config.ts (includes router stuff):

```
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideAnimations(),provideRouter(routes)]
};
```

In index.html

```
    <link rel="stylesheet" href="styles.css">
```

app.routes.ts:

```
```

Create proxy.conf.json

```
    {
      "/api": {
        "target": "http://localhost:8080",
        "secure": false
      }
    }
```

Add to package.json

```
    "start+proxy": "ng serve --proxy-config proxy.conf.json ",
```
