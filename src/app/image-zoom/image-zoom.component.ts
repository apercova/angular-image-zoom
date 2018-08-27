/**
* @author <a href="https://twitter.com/apercova" target="_blank">apercova</a>
* <a href="https://github.com/apercova" target="_blank">https://github.com/apercova</a>
* @version 1.0 2018.08
* @license MIT
*/
import {
  Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';

export const GLASS_TYPE = {CORNER: 'corner', CENTER_ADJUST: 'center-adjust', CENTER: 'center' };
export const GLASS_SHAPE = {CIRCLE: 'circle', SQUARE: 'square' };
export const MOUSE_OUT = {HIDDEN: 'hidden', VISIBLE: 'visible' };

@Component({
  selector: 'app-image-zoom',
  template: `
  <div #container class="image-zoom">
    <div #glass class="overlay glass"></div>
    <ng-content></ng-content>
  </div>
  `,
  styles: [`
  .image-zoom {
    /*Adjust relative container to image size*/
    display: table-cell;
    position: relative;
  }

  .image-zoom .overlay {
    position: absolute;
  }

  .image-zoom .glass {
    border: 1px solid #888888;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgb(49, 49, 49);
    background-repeat: no-repeat;
  }
  `]
})
export class ImageZoomComponent implements OnInit {

  @ViewChild('container') container;
  @ViewChild('glass') glass;
  @Input('image') image;
  @Input('disabled') disabled: boolean;
  @Input('zoom') zoom: number;
  @Input('ratio') ratio: number;
  @Input('type') type: string;
  @Input('shape') shape: string;
  @Input('cursor') cursor: string;
  @Input('cursorgap') cursorgap: number;
  @Input('mouseout') mouseout: string;
  @Output('load') load: EventEmitter<any> = new EventEmitter();
  @Output('error') error: EventEmitter<any> = new EventEmitter();

  private _disable: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _zoomChange: EventEmitter<number> = new EventEmitter<number>();
  private _ratioChange: EventEmitter<number> = new EventEmitter<number>();
  private _typeChange: EventEmitter<string> = new EventEmitter<string>();
  private _shapeChange: EventEmitter<string> = new EventEmitter<string>();
  private _cursorChange: EventEmitter<string> = new EventEmitter<string>();
  private _cursorgapChange: EventEmitter<number> = new EventEmitter<number>();
  private _mouseoutChange: EventEmitter<string> = new EventEmitter<string>();

  private MIN_RATIO: number;
  private MAX_RATIO: number;

  private DEF_GLASS_TYPE = GLASS_TYPE.CENTER_ADJUST;
  private DEF_GLASS_SHAPE = GLASS_SHAPE.CIRCLE;
  private DEF_CURSOR = 'zoom-in';
  // Default 1px cursor GAP to avoid hide glass on mouseout image evt
  private DEF_CURSOR_GAP = 1;

  constructor() { }

  ngOnInit() {
    this.MIN_RATIO = 24;
    this.MAX_RATIO = 48;
    this.disabled = this.disabled === true;

    this.zoom =
    (typeof(this.zoom) === 'number' && !isNaN(this.zoom) && this.zoom > 0)
    ? this.zoom : 1;
    this.ratio =
    (typeof(this.ratio) === 'number' && !isNaN(this.ratio) && this.ratio > 0)
    ? this.ratio : this.MAX_RATIO;
    this.type = this.type || this.DEF_GLASS_TYPE;
    this.shape = this.shape || this.DEF_GLASS_SHAPE;
    this.cursor = this.cursor || this.DEF_CURSOR;
    this.cursorgap =
    (typeof(this.cursorgap) === 'number' && !isNaN(this.cursorgap) && this.cursorgap > 1)
    ? this.cursorgap : 1;
    this.mouseout = this.mouseout === MOUSE_OUT.VISIBLE ? MOUSE_OUT.VISIBLE : MOUSE_OUT.HIDDEN;
    if (this.image) {
      this.image.addEventListener('load', (e) => {
        this.loadImage(e);
      });

      this.image.addEventListener('error', (e) => {
        this.loadError(e);
      });
    }
  }

  loadImage(e): void {
    this.MAX_RATIO = ((this.image.width + this.image.height) / 4);
    if (!this.disabled) {
      this.enable();
    }
    this.load.emit(this.image);
  }

  loadError(e): void {
    this.MAX_RATIO = this.MAX_RATIO;
    this.disable();
    this.error.emit({
      message: `Unable to load resouce: ${e.target.src}`,
      error: e
    });
  }

  hideGlass(): void {
    this.image.style.cursor = 'inherit';
    this.glass.nativeElement.style.cursor = 'inherit';
    this.glass.nativeElement.style.visibility = 'hidden';
  }

  showGlass(): void {
    this.image.style.cursor = this.cursor;
    this.glass.nativeElement.style.cursor = this.cursor;
    this.glass.nativeElement.style.visibility = 'visible';
  }

  isVisible(): boolean {
    return (this.glass.nativeElement.visibility === 'visible');
  }

  enable(): void {
    this.disabled = false;
    this.reset();
    this._disable.emit(this.disabled);
  }

  disable(): void {
    this.disabled = true;
    this.reset();
    this._disable.emit(this.disabled);
  }

  changeZoom(zoom: number): void {
    this.zoom =
    (typeof(zoom) === 'number' && !isNaN(zoom) && zoom > 0)
    ? zoom : 1;
    this.reset();
    this._zoomChange.emit(this.zoom);
  }

  changeRatio(ratio: number): void {
    this.ratio =
    (typeof(ratio) === 'number' && !isNaN(ratio) && ratio > 0)
    ? ratio : this.MAX_RATIO;
    this.reset();
    this._ratioChange.emit(this.ratio);
  }

  changeType(type: string): void {
    this.type = type || this.DEF_GLASS_TYPE;
    this.reset();
    this._typeChange.emit(this.type);
  }

  changeShape(shape: string): void {
    this.shape = shape || this.DEF_GLASS_SHAPE;
    this.reset();
    this._shapeChange.emit(this.shape);
  }

  changeCursor(cursor: string): void {
    this.cursor = cursor || this.DEF_CURSOR;
    this.reset();
    this._cursorChange.emit(this.cursor);
  }

  changeCursorgap(cursorgap: number): void {
    this.cursorgap =
    (typeof(cursorgap) === 'number' && !isNaN(cursorgap) && cursorgap > 1)
    ? cursorgap : 1;
    this.reset();
    this._cursorgapChange.emit(this.cursorgap);
  }

  changeMouseout(mouseout: string): void {
    this.mouseout = mouseout === MOUSE_OUT.VISIBLE ?
                    MOUSE_OUT.VISIBLE : MOUSE_OUT.HIDDEN;
    this.reset();
    this._mouseoutChange.emit(this.mouseout);
  }

  reset(): void {
    if (this.image) {
      this._initZoom();
    }
    if (this.disabled) {
      this.hideGlass();
    }
  }

  private _initZoom(): void {
    const self = this;
    let _mouseenter, _mousemove, _mouseout;

    self._applyStyle();
    self._resetGlass();
    _mouseenter = (e) => {
      e.preventDefault();
      if (!self.disabled && !self.isVisible()) {
        self.showGlass();
      }
    };

    self.image.addEventListener('mouseenter', _mouseenter);
    self.image.addEventListener('touchstart', _mouseenter);
    self.glass.nativeElement.addEventListener('mouseenter', _mouseenter);
    self.glass.nativeElement.addEventListener('touchstart', _mouseenter);

    _mousemove = (e) => {
      e.preventDefault();
      if (self.type === GLASS_TYPE.CORNER) {
        let res;
        res = self._corner(
          self.glass.nativeElement,
          self.image,
          self._getCursorPos(e, self.image),
          self.zoom,
          self.cursorgap
        );

        self.glass.nativeElement.style .top = `${res.top}px`;
        self.glass.nativeElement.style .left = `${res.left}px`;
        self.glass.nativeElement.style .backgroundPosition = `-${res.zleft}px -${res.ztop}px`;
      }
      if (self.type === GLASS_TYPE.CENTER_ADJUST) {
        e.preventDefault();
        let res;
        res = self._center(
          self.glass.nativeElement,
          self.image,
          self._getCursorPos(e, self.image),
          self.zoom
        );

        self.glass.nativeElement.style .top = `${res.top}px`;
        self.glass.nativeElement.style .left = `${res.left}px`;
        self.glass.nativeElement.style .backgroundPosition = `-${res.zleft}px -${res.ztop}px`;
      }
      if (self.type === GLASS_TYPE.CENTER) {
        e.preventDefault();
        let res;
        res = self._center_out(
          self.glass.nativeElement,
          self.image,
          self._getCursorPos(e, self.image),
          self.zoom
        );

        self.glass.nativeElement.style .top = `${res.top}px`;
        self.glass.nativeElement.style .left = `${res.left}px`;
        self.glass.nativeElement.style .backgroundPosition = `-${res.zleft}px -${res.ztop}px`;
      }
    };

    self.image.addEventListener('mousemove', _mousemove);
    self.image.addEventListener('touchmove', _mousemove);
    self.glass.nativeElement.addEventListener('mousemove', _mousemove);
    self.glass.nativeElement.addEventListener('touchmove', _mousemove);

    _mouseout = (e) => {
      if (self.mouseout === MOUSE_OUT.HIDDEN) {
        self.hideGlass();
      }
    };
    if (self.type === GLASS_TYPE.CORNER) {
      self.image.addEventListener('mouseout', _mouseout);
      self.image.addEventListener('mouseleave', _mouseout);
      self.image.addEventListener('touchend', _mouseout);
      self.image.addEventListener('touchcancel', _mouseout);
    }
    if (self.type === GLASS_TYPE.CENTER || self.type === GLASS_TYPE.CENTER_ADJUST) {
      self.glass.nativeElement.addEventListener('mouseout', _mouseout);
      self.glass.nativeElement.addEventListener('mouseleave', _mouseout);
      self.glass.nativeElement.addEventListener('touchend', _mouseout);
      self.glass.nativeElement.addEventListener('touchcancel', _mouseout);
    }

  }

  private _resetGlass(): void {
    if (isNaN(this.ratio)) {
      this.ratio = this.MAX_RATIO;
    }
    if (this.ratio < this.MIN_RATIO ) {
      this.ratio = this.MIN_RATIO;
    } else if (this.ratio > this.MAX_RATIO) {
      this.ratio = this.MAX_RATIO;
    }

    this.glass.nativeElement.style.width = `${(this.ratio)}px`;
    this.glass.nativeElement.style.height = `${(this.ratio)}px`;
    this.glass.nativeElement.style.top = 0;
    this.glass.nativeElement.style.left = 0;
    this.glass.nativeElement.style.backgroundImage = `url('${this.image.src}')`;
    this.glass.nativeElement.style.backgroundSize =
    `${(this.image.width * this.zoom)}px ${(this.image.height * this.zoom)}px`;
    this.glass.nativeElement.style .backgroundPosition = `-${0}px -${0}px`;
    if (this.shape === GLASS_SHAPE.CIRCLE) {
      this.glass.nativeElement.style['border-radius'] = '50%';
    } else {
      this.glass.nativeElement.style['border-radius'] = '0%';
    }
    this.showGlass();
    if (this.mouseout === MOUSE_OUT.HIDDEN || this.disabled === true) {
      this.hideGlass();
    }
  }

  private _applyStyle(): void {
    this.image.style.cursor = this.cursor;
    this.glass.nativeElement.style.cursor = this.cursor;
  }

  private _getCursorPos = (e, target) => {
    let a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = target.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }

  private _corner(glass: any, image: any, cursor, zoom: number, gap: number) {
    let left, top, w, h, x, y, zleft, ztop;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    x = cursor.x;
    y = cursor.y;

    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > image.width - (w / zoom)) {x = image.width - (w / zoom) - 1; }
    if (x < w / zoom) {x = w / zoom; }
    if (y > image.height - (h / zoom)) {y = image.height - (h / zoom) - 1; }
    if (y < h / zoom) {y = h / zoom; }

    /*set the position of the magnifier glass:*/
    left = x;
    top = y;

    /*detect image limits*/
    if ((x + gap + glass.offsetWidth) > image.width) {
      left = (x - gap - glass.offsetWidth);
    } else {
      left = (x + gap );
    }
    if ((y + glass.offsetHeight) > image.height) {
      top = (y - glass.offsetHeight);
    } else {
      top = (y);
    }

    /*zoom magnifier glass position*/
    zleft = ((x * zoom) - w);
    ztop = ((y * zoom) - h);

    return {left: left, zleft: zleft, ztop: ztop, top: top, x: x, y: y, w: w, h: h };
  }

  private _center(glass: any, image: any, cursor, zoom: number) {
    let left, top, w, h, x, y, zleft, ztop;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    x = cursor.x;
    y = cursor.y;

    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > image.width - (w / zoom)) {x = image.width - (w / zoom) - 1; }
    if (x < w / zoom) {x = w / zoom; }
    if (y > image.height - (h / zoom)) {y = image.height - (h / zoom) - 1; }
    if (y < h / zoom) {y = h / zoom; }

    /*set the position of the magnifier glass:*/
    left = (x - w);
    top = (y - h);

    /*detect image limits*/
    if ((x - w ) <= 0) {
      left = 0;
    } else if ((x + w) >= image.width) {
      left = (image.width - glass.offsetWidth );
    } else {
      left = (x - w );
    }

    if ((y - h ) <= 0) {
      top = 0;
    } else if ((y + h) >= image.height) {
      top = (image.height - glass.offsetHeight);
    } else {
      top = (y - h );
    }

    /*zoom magnifier glass position*/
    zleft = ((x * zoom) - w);
    ztop = ((y * zoom) - h);

    return {left: left, zleft: zleft, ztop: ztop, top: top, x: x, y: y, w: w, h: h };
  }

  private _center_out(glass: any, image: any, cursor, zoom: number) {
    let left, top, w, h, x, y, zleft, ztop;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    x = cursor.x;
    y = cursor.y;

    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > image.width - (w / zoom)) {x = image.width - (w / zoom) - 1; }
    if (x < w / zoom) {x = w / zoom; }
    if (y > image.height - (h / zoom)) {y = image.height - (h / zoom) - 1; }
    if (y < h / zoom) {y = h / zoom; }

    /*set the position of the magnifier glass:*/
    left = (x - w);
    top = (y - h);

    /*detect image limits*/
    if ((x - w / zoom ) <= 0) {
      left = 0 - (w / zoom);
    } else if ((x + w / zoom) >= image.width) {
      left = (image.width - glass.offsetWidth );
    } else {
      left = (x - w );
    }

    if ((y - h / zoom ) <= 0) {
      top = 0 - (h / zoom);
    } else if ((y + h / zoom) >= image.height) {
      top = (image.height - glass.offsetHeight);
    } else {
      top = (y - h );
    }

    /*zoom magnifier glass position*/
    zleft = ((x * zoom) - w);
    ztop = ((y * zoom) - h);

    return {left: left, zleft: zleft, ztop: ztop, top: top, x: x, y: y, w: w, h: h };
  }

}
