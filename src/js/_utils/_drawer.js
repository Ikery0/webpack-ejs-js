'use strict';
import { BgFix } from './_bgFix';
/*
{
  hamburger: hamburger btn id, 
  menu: navigation class,
  CLASS: class name what you wanna add,
  focusTrap: focus trap id,
}
*/
export class Drawer {
  constructor(obj) {
    this.DOM = {};
    this.DOM.hamburger = document.getElementById(obj.hamburger);
    this.DOM.menu = document.querySelector(`.${obj.menu}`);
    this.DOM.focusTrap = document.getElementById(obj.focusTrap);
    this.CLASS = obj.CLASS;
    this.flg = false;
    this.bgFix = new BgFix();

    this._addEvent();
  }

  _addEvent() {
    const that = this;
    this.DOM.hamburger.addEventListener('click', () => {
      //ハンバーガーボタンが選択されたら
      that.flg ? that._close() : that._open();
    });

    this.DOM.focusTrap.addEventListener('focus', () => {
      that.DOM.hamburger.focus();
    });

    window.addEventListener('keydown', (e) => {
      //escキー押下でメニューを閉じられるように
      if (e.key === 'Escape') {
        that._close();
      }
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 768px)').matches && that.flg) that._close();
    });
  }

  _open() {
    this.flg = true;
    this.bgFix.on();
    this.DOM.menu.classList.add(this.CLASS);
    this.DOM.hamburger.classList.add(this.CLASS);
    this.DOM.hamburger.setAttribute('aria-expanded', 'true');
    this.DOM.menu.setAttribute('aria-hidden', 'false');
    this.DOM.hamburger.focus();
  }

  _close() {
    this.flg = false;
    this.bgFix.off();
    this.DOM.menu.classList.remove(this.CLASS);
    this.DOM.hamburger.classList.remove(this.CLASS);
    this.DOM.hamburger.setAttribute('aria-expanded', 'false');
    this.DOM.menu.setAttribute('aria-hidden', 'true');
  }
}
