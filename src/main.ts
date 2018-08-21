/**
* @author <a href="https://twitter.com/apercova" target="_blank">apercova</a>
* <a href="https://github.com/apercova" target="_blank">https://github.com/apercova</a>
* @version 1.0 2018.08
* @license MIT
*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
