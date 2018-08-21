/**
* @author <a href="https://twitter.com/apercova" target="_blank">apercova</a>
* <a href="https://github.com/apercova" target="_blank">https://github.com/apercova</a>
* @version 1.0 2018.08
* @license MIT
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageZoomComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
