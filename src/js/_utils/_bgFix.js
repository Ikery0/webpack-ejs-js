'use strict';

export class BgFix {
  on() {
    const scrollY = this._getScrollElement().scrollTop;
    const styles = {
      height: '100vh',
      position: 'fixed',
      top: `${scrollY * -1}px`,
      left: '0',
      width: '100vw',
    };

    Object.keys(styles).forEach((key) => {
      document.body.style[key] = styles[key];
    });
  }

  off() {
    const scrollY = parseInt(document.body.style.top || '0');
    const styles = {
      height: '',
      position: '',
      top: '',
      left: '',
      width: '',
    };

    Object.keys(styles).forEach((key) => {
      document.body.style[key] = styles[key];
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
