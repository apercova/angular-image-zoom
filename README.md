# Angular Image Zoom
![https://apercova.github.io/angular-image-zoom/](https://apercova.github.io/angular-image-zoom/favicon.ico)  
## Image amplifier component for angular2+. See a demo [here](https://apercova.github.io/angular-image-zoom/)!

## Properties

- `image`: Image tag reference.  
- `disabled`: Whether disable component or not.  
- `zoom`: Zomm level  
- `ratio`: Zomm glass size in pixels for zoom glass shape. 
  - Ratio size for circle shape.  
  - Base size for square shape.  
- `cursor`: CSS cursor type.  
- `cursorgap`: Gap in pixels between cursor and zoom glass. Only for corner type.  
- `type`: Type of zoom glass:  
  - `corner`: Cornered cursor wrapped within image.  
  - `center`: Centered cursor within zoom glass.  
  - `center-adjust`: Centered cursor within zoom glass wrapped within image.
- `shape`: Shape of zoom glass:  
  - `square`: Square shape.  
  - `circle`: Circle shape.  
- `mouseout`: Default `onmouseout` behaviour.
  - `visible`: Visible zoom glass.
  - `hidden`: Hidden zoom glass.
- `load`: `EventEmitter<any>` Event fired after image is loaded and setup done.  
- `error`: `EventEmitter<any>` Event fired on image loading error.  

## Usage
> component.html
```html
    <app-image-zoom #preview
        [image]="image"
        [disabled]="false"
        [zoom]="2"
        [ratio]="100"
        [cursor]="'pointer'"
        [cursorgap]="5"
        [type]="'center'"
        [shape]="'circle'"
        [mouseout]="'visible'"

        (load)="zoomLoaded($event)"
        (error)="zoomError($event)">
    >
        <img #image style="max-width: 100%"
        src="https://upload.wikimedia.org/wikipedia/commons/f/f3/GOD_-_panoramio.jpg">
    </app-image-zoom>
```
> component.ts
```ts
  ...
  
  zoomLoaded(target): void {
    console.log(target);
  }

  zoomError(error): void {
    console.error(error);
  }
  
  ...
```

> Icons taken from [freeiconshop.com](http://freeiconshop.com/icon/zoom-in-icon-flat/)
---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
