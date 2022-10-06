'use strict'

export class BgFix {
  constructor() {
    this.scrollY = 0;
    this.styles = {
      height: '100vh',
      position: 'fixed',
      top: `${this.scrollY * -1}px`,
      left: '0',
      width: '100vw',
    }
  }

  on() {
    this.scrollY = this._getScrollElement().scrollTop;

    Object.keys(this.styles).forEach((key) => {
      document.body.style[key] = this.styles[key];
    });
  }

  off() {
    this.scrollY = parseInt(document.body.style.top || '0');

    Object.keys(this.styles).forEach((key) => {
      document.body.style[key] = '';
    });

    window.scrollTo(0, scrollY * -1);
  }

  _getScrollElement() {
    if ('scrollingElement' in document) {
      return document.scrollingElement;
    } else {
      return document.documentElement;
    }
  }
}
