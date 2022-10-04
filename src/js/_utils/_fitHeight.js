'use strict'
//iosの100vhに対応
export class FitHeight {
  constructor() {
    this._addEvent();
    this.windowHeight = window.innerHeight
  }

  _set() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  _checkHeight() {
    if (this.windowHeight === window.innerHeight) {
      return false
    }

   this._set()
  }

  _addEvent() {
    this._set()
    const that = this
    window.addEventListener('resize', that._checkHeight.bind(this))
  }
}